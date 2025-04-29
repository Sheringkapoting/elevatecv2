
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProfileFormValues } from "../profileSchemas";

interface ContactInformationProps {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
}

export function ContactInformation({ form }: ContactInformationProps) {
  return (
    <div className="text-left">
      <Separator className="my-4" />
      <h3 className="text-lg font-medium text-left">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 234 567 890" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
