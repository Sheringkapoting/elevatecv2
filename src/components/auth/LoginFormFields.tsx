
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginFormFields = () => {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setFormError(null);

    // Basic empty value check (should not be possible because of zod, but defensive)
    if (!data.email || !data.password) {
      setFormError("Both email and password are required.");
      form.resetField("password");
      return;
    }

    setIsLoading(true);
    try {
      await signIn(data.email, data.password);

      toast({
        title: "Successfully signed in",
        description: "Welcome back to Elevate CV!",
      });

      window.dispatchEvent(new Event("login:success"));
      // Don't navigate: AuthProvider handles redirection after session change
    } catch (error: any) {
      // The error type in useAuth just sets error in store, so the actual thrown error isn't very informative
      let errorMsg = "Please check your credentials and try again.";
      if (
        error &&
        typeof error.message === "string" &&
        error.message.includes("Invalid login credentials")
      ) {
        errorMsg = "Incorrect email or password. Please try again.";
      } else if (
        error &&
        typeof error.message === "string" &&
        error.message.includes("network")
      ) {
        errorMsg = "Unable to connect to server. Please try again later.";
      }

      setFormError(errorMsg);
      // Optionally, clear password field after error for security.
      form.resetField("password");
      toast({
        title: "Error signing in",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} autoComplete="username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formError && (
          <div className="text-red-600 py-2 text-sm font-medium">
            {formError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};
