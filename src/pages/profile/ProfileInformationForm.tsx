
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProfileFormValues, profileFormSchema } from "./profileSchemas";
import { PersonalInformation } from "./components/PersonalInformation";
import { ContactInformation } from "./components/ContactInformation";
import { ProfessionalLinks } from "./components/ProfessionalLinks";

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
            <PersonalInformation form={profileForm} />
            <ContactInformation form={profileForm} />
            <ProfessionalLinks form={profileForm} />
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
