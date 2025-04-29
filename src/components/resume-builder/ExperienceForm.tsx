
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onExperienceChange: (id: string, field: string, value: string) => void;
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
}

const ExperienceForm = ({ 
  experiences, 
  onExperienceChange, 
  onAddExperience, 
  onRemoveExperience 
}: ExperienceFormProps) => {
  const { toast } = useToast();

  const handleRemove = (id: string) => {
    if (experiences.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one experience entry.",
        variant: "destructive",
      });
      return;
    }
    onRemoveExperience(id);
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <Card key={exp.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-medium text-gray-900">
                  Experience {index + 1}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(exp.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label htmlFor={`${exp.id}-title`} className="text-left">Job Title</Label>
                <Input
                  id={`${exp.id}-title`}
                  value={exp.title}
                  onChange={(e) => onExperienceChange(exp.id, "title", e.target.value)}
                  placeholder="Software Developer"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor={`${exp.id}-company`} className="text-left">Company</Label>
                <Input
                  id={`${exp.id}-company`}
                  value={exp.company}
                  onChange={(e) => onExperienceChange(exp.id, "company", e.target.value)}
                  placeholder="ABC Company"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor={`${exp.id}-location`} className="text-left">Location</Label>
                <Input
                  id={`${exp.id}-location`}
                  value={exp.location}
                  onChange={(e) => onExperienceChange(exp.id, "location", e.target.value)}
                  placeholder="New York, NY"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor={`${exp.id}-startDate`} className="text-left">Start Date</Label>
                  <Input
                    id={`${exp.id}-startDate`}
                    value={exp.startDate}
                    onChange={(e) => onExperienceChange(exp.id, "startDate", e.target.value)}
                    placeholder="Jan 2020"
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <Label htmlFor={`${exp.id}-endDate`} className="text-left">End Date</Label>
                  <Input
                    id={`${exp.id}-endDate`}
                    value={exp.endDate}
                    onChange={(e) => onExperienceChange(exp.id, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-2 text-left">
                <Label htmlFor={`${exp.id}-description`} className="text-left">Description</Label>
                <Textarea
                  id={`${exp.id}-description`}
                  value={exp.description}
                  onChange={(e) => onExperienceChange(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements in this role..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={onAddExperience} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
