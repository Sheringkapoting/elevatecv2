
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { experienceOptions } from "./guided-filter/constants";

interface ExperienceSelectionPageProps {
  selectedExperience: string;
  onExperienceSelect: (experience: string) => void;
  onContinue: () => void;
}

const ExperienceSelectionPage = ({ 
  selectedExperience, 
  onExperienceSelect, 
  onContinue 
}: ExperienceSelectionPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          How long have you been working?
        </h1>
        <p className="text-gray-600 mb-12">
          We'll find the best templates for your experience level.
        </p>

        {/* Experience options */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {experienceOptions.map((option) => (
            <Button
              key={option}
              variant={selectedExperience === option ? "default" : "outline"}
              onClick={() => onExperienceSelect(option)}
              className={`px-8 py-4 text-base ${
                selectedExperience === option 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "hover:bg-gray-50"
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button
            onClick={onContinue}
            disabled={!selectedExperience}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-base"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSelectionPage;
