
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormValues } from "../profileSchemas";

interface PersonalInformationProps {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
}

export function PersonalInformation({ form }: PersonalInformationProps) {
  return (
    <div className="space-y-4">
      <div className="text-left">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left mt-4">
              <FormLabel className="text-left">Email</FormLabel>
              <FormControl>
                <Input readOnly placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription className="text-left">Your email address is managed via your login settings.</FormDescription>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem className="text-left mt-4">
              <FormLabel className="text-left">Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Developer" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="text-left mt-4">
              <FormLabel className="text-left">Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a little about yourself" 
                  {...field} 
                  value={field.value || ''}
                  className="min-h-[100px]" 
                />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
