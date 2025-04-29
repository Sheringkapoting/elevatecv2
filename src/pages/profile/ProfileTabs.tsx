
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileInformationForm } from "./ProfileInformationForm";
import { SecuritySettingsForm } from "./SecuritySettingsForm";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName: string | null;
  email: string | undefined | null;
  profile: any;
  user: any;
}

export default function ProfileTabs({
  activeTab,
  setActiveTab,
  userName,
  email,
  profile,
  user
}: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="w-full md:w-[400px] grid-cols-2 flex justify-start">
        <TabsTrigger value="profile">Profile Information</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <ProfileInformationForm userName={userName} email={email} profile={profile} user={user} />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettingsForm />
      </TabsContent>
    </Tabs>
  );
}
