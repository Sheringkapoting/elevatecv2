
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProfileFormValues } from "../profileSchemas";

interface ProfessionalLinksProps {
  form: ReturnType<typeof useForm<ProfileFormValues>>;
}

export function ProfessionalLinks({ form }: ProfessionalLinksProps) {
  return (
    <div className="text-left">
      <Separator className="my-4" />
      <h3 className="text-lg font-medium text-left">Professional Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/username" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">GitHub</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-left">Portfolio</FormLabel>
              <FormControl>
                <Input placeholder="https://yourportfolio.com" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
