import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import ProfileAvatarHeader from "./profile/ProfileAvatarHeader";
import ProfileTabs from "./profile/ProfileTabs";

export default function ProfilePage() {
  const { user, profileImage, userName } = useAuth();
  const { profile, isLoading } = useProfile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!user) {
      navigate("/");
      toast({
        title: "Authentication required",
        description: "You must be logged in to view this page",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);

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
