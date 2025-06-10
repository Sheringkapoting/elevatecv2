
import { Button } from "@/components/ui/button";
import { experienceOptions } from "./constants";

interface ExperienceStepProps {
  selectedExperience: string;
  onExperienceSelect: (experience: string) => void;
}

const ExperienceStep = ({ selectedExperience, onExperienceSelect }: ExperienceStepProps) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {experienceOptions.map((option) => (
        <Button
          key={option}
          variant={selectedExperience === option ? "default" : "outline"}
          onClick={() => onExperienceSelect(option)}
          className="px-6 py-2"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default ExperienceStep;
