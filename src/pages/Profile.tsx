
import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

import ProfileAvatarHeader from "./profile/ProfileAvatarHeader";
import ProfileTabs from "./profile/ProfileTabs";

export default function ProfilePage() {
  const { user, profileImage, userName, loading, setSession } = useAuth();
  const { profile, isLoading, refreshProfile } = useProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const handleRefreshProfile = useCallback(() => {
    refreshProfile();
    
    // This will trigger a re-fetch of the session to update the profile image
    // in the auth state as well
    if (user) {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data.session);
      });
    }
  }, [refreshProfile, user, setSession]);

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
      <div className="flex flex-col items-start">
        <ProfileAvatarHeader
          profileImage={profileImage}
          userName={userName}
          email={user?.email}
          userId={user?.id}
          refreshProfile={handleRefreshProfile}
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
    </div>
  );
}
