
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileAvatarHeaderProps {
  profileImage: string | null;
  userName: string | null;
  email: string | null | undefined;
}

export default function ProfileAvatarHeader({
  profileImage,
  userName,
  email,
}: ProfileAvatarHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <Avatar className="h-24 w-24 mb-4">
        {profileImage ? (
          <AvatarImage src={profileImage} alt={userName || 'User'} />
        ) : (
          <AvatarFallback className="bg-primary-100 text-primary-800">
            <User className="h-12 w-12" />
          </AvatarFallback>
        )}
      </Avatar>
      <h1 className="text-3xl font-bold">{userName || 'My Profile'}</h1>
      <p className="text-muted-foreground">{email}</p>
    </div>
  );
}
