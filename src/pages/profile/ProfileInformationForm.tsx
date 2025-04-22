
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ProfileFormValues, profileFormSchema } from "./profileSchemas";

interface ProfileInformationFormProps {
  userName: string | null;
  email: string | undefined | null;
  profile: any;
  user: any;
}

export function ProfileInformationForm({ userName, email, profile, user }: ProfileInformationFormProps) {
  const { updateProfile } = useProfile();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: userName || "",
      email: email || "",
      jobTitle: profile?.job_title || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      phone: profile?.phone || "",
      linkedin: profile?.linkedin || "",
      github: profile?.github || "",
      portfolio: profile?.portfolio || "",
    },
    values: {
      fullName: userName || "",
      email: email || "",
      jobTitle: profile?.job_title || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      phone: profile?.phone || "",
      linkedin: profile?.linkedin || "",
      github: profile?.github || "",
      portfolio: profile?.portfolio || "",
    },
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      const nameParts = data.fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await updateProfile.mutateAsync({
        first_name: firstName,
        last_name: lastName,
        job_title: data.jobTitle,
        bio: data.bio,
        location: data.location,
        phone: data.phone,
        linkedin: data.linkedin,
        github: data.github,
        portfolio: data.portfolio,
      });

      const { error } = await supabase.auth.updateUser({
        data: { full_name: data.fullName }
      });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description: error.message || "There was an error updating your profile",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information here. This information will be displayed publicly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            <FormField
              control={profileForm.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input readOnly placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>Your email address is managed via your login settings.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Developer" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={profileForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us a little about yourself" 
                      {...field} 
                      value={field.value || ''}
                      className="min-h-[100px]" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-4" />
            <h3 className="text-lg font-medium">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />
            <h3 className="text-lg font-medium">Professional Links</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={profileForm.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={profileForm.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourportfolio.com" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pb-0 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
