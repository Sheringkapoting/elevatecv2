
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Globe, MapPin, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
}

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoForm = ({ personalInfo, onInfoChange }: PersonalInfoFormProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-medium text-gray-900">Personal Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={personalInfo.name}
                onChange={onInfoChange}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={personalInfo.title}
                onChange={onInfoChange}
                placeholder="Software Developer"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={onInfoChange}
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={personalInfo.phone}
                onChange={onInfoChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={personalInfo.location}
                onChange={onInfoChange}
                placeholder="New York, NY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                name="website"
                value={personalInfo.website}
                onChange={onInfoChange}
                placeholder="https://johndoe.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={personalInfo.linkedin}
                onChange={onInfoChange}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
