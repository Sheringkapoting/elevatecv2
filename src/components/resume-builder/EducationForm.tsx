
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationFormProps {
  education: Education[];
  onEducationChange: (id: string, field: string, value: string) => void;
  onAddEducation: () => void;
  onRemoveEducation: (id: string) => void;
}

const EducationForm = ({
  education,
  onEducationChange,
  onAddEducation,
  onRemoveEducation,
}: EducationFormProps) => {
  const { toast } = useToast();

  const handleRemove = (id: string) => {
    if (education.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one education entry.",
        variant: "destructive",
      });
      return;
    }
    onRemoveEducation(id);
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <Card key={edu.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary-600" />
                <h2 className="text-xl font-medium text-gray-900">
                  Education {index + 1}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(edu.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <Label htmlFor={`${edu.id}-degree`} className="text-left">Degree</Label>
                <Input
                  id={`${edu.id}-degree`}
                  value={edu.degree}
                  onChange={(e) => onEducationChange(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor={`${edu.id}-school`} className="text-left">School</Label>
                <Input
                  id={`${edu.id}-school`}
                  value={edu.school}
                  onChange={(e) => onEducationChange(edu.id, "school", e.target.value)}
                  placeholder="University of Example"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor={`${edu.id}-location`} className="text-left">Location</Label>
                <Input
                  id={`${edu.id}-location`}
                  value={edu.location}
                  onChange={(e) => onEducationChange(edu.id, "location", e.target.value)}
                  placeholder="Boston, MA"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor={`${edu.id}-startDate`} className="text-left">Start Date</Label>
                  <Input
                    id={`${edu.id}-startDate`}
                    value={edu.startDate}
                    onChange={(e) => onEducationChange(edu.id, "startDate", e.target.value)}
                    placeholder="Sep 2016"
                  />
                </div>
                
                <div className="space-y-2 text-left">
                  <Label htmlFor={`${edu.id}-endDate`} className="text-left">End Date</Label>
                  <Input
                    id={`${edu.id}-endDate`}
                    value={edu.endDate}
                    onChange={(e) => onEducationChange(edu.id, "endDate", e.target.value)}
                    placeholder="May 2020"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-2 text-left">
                <Label htmlFor={`${edu.id}-description`} className="text-left">Description (Optional)</Label>
                <Textarea
                  id={`${edu.id}-description`}
                  value={edu.description}
                  onChange={(e) => onEducationChange(edu.id, "description", e.target.value)}
                  placeholder="Relevant coursework, achievements, or activities..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={onAddEducation} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add Another Education
      </Button>
    </div>
  );
};

export default EducationForm;
