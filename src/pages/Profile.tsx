
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";

import ProfileAvatarHeader from "./profile/ProfileAvatarHeader";
import ProfileTabs from "./profile/ProfileTabs";

export default function ProfilePage() {
  const { user, profileImage, userName, loading } = useAuth();
  const { profile, isLoading } = useProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // No need to redirect here since ProtectedRoute handles that
  // This avoids duplicate redirects

  // Show loading state if auth is still loading
  if (loading) {
    return <div className="container max-w-4xl py-10 mt-16">Loading profile...</div>;
  }

  // If no user (shouldn't happen with ProtectedRoute but just in case)
  if (!user) {
    return null;
  }

  return (
    <div className="container max-w-4xl py-10 mt-16">
      <ProfileAvatarHeader
        profileImage={profileImage}
        userName={userName}
        email={user?.email}
      />
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={userName}
        email={user?.email}
        profile={profile}
        user={user}
      />
    </div>
  );
}
