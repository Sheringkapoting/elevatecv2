
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: string;
  name: string;
}

interface SkillsFormProps {
  skills: Skill[];
  onSkillChange: (id: string, value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (id: string) => void;
}

const SkillsForm = ({
  skills,
  onSkillChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsFormProps) => {
  const { toast } = useToast();

  const handleRemove = (id: string) => {
    if (skills.length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You must have at least one skill entry.",
        variant: "destructive",
      });
      return;
    }
    onRemoveSkill(id);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-medium text-gray-900 text-left">Skills</h2>
          </div>
          
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center space-x-2">
                <Input
                  value={skill.name}
                  onChange={(e) => onSkillChange(skill.id, e.target.value)}
                  placeholder="e.g., JavaScript, Project Management, UX Design"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(skill.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button onClick={onAddSkill} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Skill
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
