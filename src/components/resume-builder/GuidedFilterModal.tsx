
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterSelections } from "./guided-filter/types";
import { filterSteps } from "./guided-filter/constants";
import StepContent from "./guided-filter/StepContent";

interface GuidedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selections: FilterSelections) => void;
}

const GuidedFilterModal = ({ isOpen, onClose, onComplete }: GuidedFilterModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<FilterSelections>({
    experience: "",
    hasPhoto: null,
    layout: "",
    style: "",
    occupation: []
  });

  const handleNext = () => {
    if (currentStep < filterSteps.length - 1) {
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
    const step = filterSteps[currentStep];
    switch (step.type) {
      case "experience":
        return selections.experience !== "";
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
              {filterSteps.map((_, index) => (
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
              {filterSteps[currentStep].title}
            </DialogTitle>
            <p className="text-gray-600">{filterSteps[currentStep].subtitle}</p>
          </div>
        </DialogHeader>

        <div className="py-8">
          <StepContent
            stepType={filterSteps[currentStep].type}
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
            {currentStep === filterSteps.length - 1 ? "See Templates" : "Next"}
            {currentStep < filterSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidedFilterModal;
