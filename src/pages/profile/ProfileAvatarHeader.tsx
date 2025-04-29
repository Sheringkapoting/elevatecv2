
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Upload, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileAvatarHeaderProps {
  profileImage: string | null;
  userName: string | null;
  email: string | null | undefined;
  userId: string | null;
  refreshProfile: () => void;
}

export default function ProfileAvatarHeader({
  profileImage,
  userName,
  email,
  userId,
  refreshProfile,
}: ProfileAvatarHeaderProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0 || !userId) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `profile_images/${fileName}`;

      setUploading(true);

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      // Update profile in the database with the new image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ profile_picture: publicUrl })
        .eq('id', userId);

      if (updateError) {
        throw updateError;
      }

      // Refresh profile to show new image
      refreshProfile();

      toast({
        title: "Success",
        description: "Profile image updated successfully",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the file input value to allow selecting the same file again
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <Avatar className="h-24 w-24 mb-4">
          {profileImage ? (
            <AvatarImage src={profileImage} alt={userName || 'User'} />
          ) : (
            <AvatarFallback className="bg-primary-100 text-primary-800">
              <User className="h-12 w-12" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <label htmlFor="profile-image-upload" className="absolute bottom-4 right-0 bg-white rounded-full p-1 cursor-pointer border border-gray-300 hover:bg-gray-100">
          {profileImage ? (
            <Edit className="h-4 w-4 text-gray-600" />
          ) : (
            <Upload className="h-4 w-4 text-gray-600" />
          )}
          <input
            id="profile-image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
      </div>
      <h1 className="text-3xl font-bold text-left">{userName || 'My Profile'}</h1>
      <p className="text-muted-foreground">{email}</p>
      {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
    </div>
  );
}
