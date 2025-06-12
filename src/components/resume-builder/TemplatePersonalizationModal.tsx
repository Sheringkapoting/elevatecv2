
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterSelections } from "./guided-filter/types";
import StepContent from "./guided-filter/StepContent";

interface TemplatePersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selections: FilterSelections) => void;
  initialExperience: string;
}

const personalizationSteps = [
  {
    type: "photo",
    title: "Will you be adding a photo to your resume?",
    subtitle: "Add a photo if it's a standard practice in your industry or region."
  },
  {
    type: "layout",
    title: "Choose your preferred layout",
    subtitle: "Select the layout that best fits your industry and experience level."
  },
  {
    type: "style",
    title: "What style do you prefer?",
    subtitle: "Choose a style that matches your professional image."
  },
  {
    type: "occupation",
    title: "What's your occupation?",
    subtitle: "Select all that apply to get the most relevant templates."
  }
];

const TemplatePersonalizationModal = ({ 
  isOpen, 
  onClose, 
  onComplete,
  initialExperience 
}: TemplatePersonalizationModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<FilterSelections>({
    experience: initialExperience,
    hasPhoto: null,
    layout: "",
    style: "",
    occupation: []
  });

  const handleNext = () => {
    if (currentStep < personalizationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(selections);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelection = (type: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const canProceed = () => {
    const step = personalizationSteps[currentStep];
    switch (step.type) {
      case "photo":
        return selections.hasPhoto !== null;
      case "layout":
        return selections.layout !== "";
      case "style":
        return selections.style !== "";
      case "occupation":
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="text-center">
            {/* Progress dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {personalizationSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-blue-600' : 
                    index < currentStep ? 'bg-blue-300' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <DialogTitle className="text-2xl font-semibold mb-2">
              {personalizationSteps[currentStep].title}
            </DialogTitle>
            <p className="text-gray-600">{personalizationSteps[currentStep].subtitle}</p>
          </div>
        </DialogHeader>

        <div className="py-8">
          <StepContent
            stepType={personalizationSteps[currentStep].type}
            selections={selections}
            onSelectionChange={handleSelection}
          />
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            {currentStep === personalizationSteps.length - 1 ? "See Templates" : "Next"}
            {currentStep < personalizationSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePersonalizationModal;
