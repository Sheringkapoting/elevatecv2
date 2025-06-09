
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface FilterSelections {
  experience: string;
  hasPhoto: boolean | null;
  layout: string;
  style: string;
  occupation: string[];
}

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

  const steps = [
    {
      title: "How long have you been working?",
      subtitle: "We'll find the best templates for your experience level.",
      type: "experience"
    },
    {
      title: "Will you be adding a photo to your resume?",
      subtitle: "Add a photo if it's a standard practice in your industry or region.",
      type: "photo"
    },
    {
      title: "What layout suits you best?",
      subtitle: "Use one column to fit more info, or two columns for better organization.",
      type: "layout"
    },
    {
      title: "What style do you prefer?",
      subtitle: "Pick a resume style based on your industry, you can choose multiple styles too.",
      type: "style"
    },
    {
      title: "What is your occupation?",
      subtitle: "Skip this if needed—we'll use your previous responses to recommend templates.",
      type: "occupation"
    }
  ];

  const experienceOptions = [
    "No Experience",
    "Less Than 3 Years", 
    "3-5 Years",
    "5-10 Years",
    "10+ Years"
  ];

  const layoutOptions = [
    { 
      id: "two-column", 
      title: "Two columns",
      description: "Better organization",
      preview: (
        <div className="w-full h-32 bg-blue-600 rounded flex">
          <div className="w-1/3 bg-blue-800 p-2">
            <div className="w-8 h-8 bg-white rounded-full mb-2"></div>
            <div className="space-y-1">
              <div className="h-2 bg-blue-300 rounded"></div>
              <div className="h-2 bg-blue-300 rounded"></div>
              <div className="h-2 bg-blue-300 rounded"></div>
            </div>
          </div>
          <div className="flex-1 p-2">
            <div className="space-y-2">
              <div className="h-3 bg-blue-200 rounded"></div>
              <div className="h-2 bg-blue-200 rounded w-3/4"></div>
              <div className="h-2 bg-blue-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      )
    },
    { 
      id: "one-column", 
      title: "One column",
      description: "Fit more info",
      preview: (
        <div className="w-full h-32 bg-gray-100 rounded p-2">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
            <div className="h-3 bg-gray-300 rounded flex-1"></div>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-300 rounded"></div>
            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
            <div className="h-2 bg-gray-300 rounded w-3/5"></div>
            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
          </div>
        </div>
      )
    }
  ];

  const styleOptions = [
    {
      id: "simple-classic",
      title: "Simple & classic",
      description: "For standard corporate roles",
      preview: (
        <div className="w-full h-32 bg-white border rounded p-2">
          <div className="text-xs font-bold mb-1">Arthur Smith</div>
          <div className="text-xs text-gray-600 mb-2">Senior Data Manager</div>
          <div className="space-y-1">
            <div className="h-1 bg-gray-200 rounded"></div>
            <div className="h-1 bg-gray-200 rounded w-4/5"></div>
            <div className="h-1 bg-gray-200 rounded w-3/5"></div>
          </div>
        </div>
      )
    },
    {
      id: "modern-subtle",
      title: "Modern & subtle", 
      description: "For tech, startups, or innovative roles",
      preview: (
        <div className="w-full h-32 bg-blue-600 rounded p-2 text-white">
          <div className="text-xs font-bold mb-1">Arthur Smith</div>
          <div className="text-xs mb-2 opacity-80">Senior Data Manager</div>
          <div className="space-y-1">
            <div className="h-1 bg-blue-300 rounded"></div>
            <div className="h-1 bg-blue-300 rounded w-4/5"></div>
            <div className="h-1 bg-blue-300 rounded w-3/5"></div>
          </div>
        </div>
      )
    },
    {
      id: "bold-striking",
      title: "Bold & striking",
      description: "For design, media, or creative roles",
      preview: (
        <div className="w-full h-32 bg-gradient-to-r from-teal-400 to-teal-600 rounded p-2 text-white">
          <div className="w-6 h-6 bg-pink-500 rounded-full mb-1"></div>
          <div className="text-xs font-bold mb-1">Arthur Smith</div>
          <div className="space-y-1">
            <div className="h-1 bg-teal-200 rounded"></div>
            <div className="h-1 bg-teal-200 rounded w-3/4"></div>
          </div>
        </div>
      )
    }
  ];

  // Match the occupation options from TemplateFilters.tsx
  const occupationOptions = [
    'Management & Executive',
    'Office & Administrative Support',
    'Business & Finance',
    'Retail & Sales',
    'Healthcare & Medical',
    'Food & Beverage',
    'Transportation',
    'Education & Library',
    'Home Health & Nursing Aides',
    'Personal Care & Service',
    'Community & Social Service',
    'Computer & Technology',
    'Manufacturing & Production',
    'Construction & Trade',
    'Arts & Entertainment',
    'Technician',
    'Public Safety',
    'Groundskeeping',
    'Architecture & Engineering',
    'Science',
    'Legal',
    'Agriculture & Natural Resources',
    'Military'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const renderStepContent = () => {
    const step = steps[currentStep];
    
    switch (step.type) {
      case "experience":
        return (
          <div className="flex flex-wrap gap-3 justify-center">
            {experienceOptions.map((option) => (
              <Button
                key={option}
                variant={selections.experience === option ? "default" : "outline"}
                onClick={() => handleSelection("experience", option)}
                className="px-6 py-2"
              >
                {option}
              </Button>
            ))}
          </div>
        );

      case "photo":
        return (
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card 
              className={`cursor-pointer border-2 ${selections.hasPhoto === true ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => handleSelection("hasPhoto", true)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-full h-32 bg-blue-100 rounded mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="font-semibold mb-2">With Photo</h3>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer border-2 ${selections.hasPhoto === false ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => handleSelection("hasPhoto", false)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-full h-32 bg-gray-100 rounded mb-4"></div>
                <h3 className="font-semibold mb-2">Without Photo</h3>
              </CardContent>
            </Card>
          </div>
        );

      case "layout":
        return (
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {layoutOptions.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer border-2 ${selections.layout === option.id ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => handleSelection("layout", option.id)}
              >
                <CardContent className="p-6 text-center">
                  {option.preview}
                  <h3 className="font-semibold mt-4 mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "style":
        return (
          <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
            {styleOptions.map((option) => (
              <Card 
                key={option.id}
                className={`cursor-pointer border-2 ${selections.style === option.id ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => handleSelection("style", option.id)}
              >
                <CardContent className="p-4 text-center">
                  {option.preview}
                  <h3 className="font-semibold mt-3 mb-1 text-sm">{option.title}</h3>
                  <p className="text-xs text-gray-600">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "occupation":
        return (
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {occupationOptions.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selections.occupation.includes(option)}
                  onChange={(e) => {
                    const newOccupations = e.target.checked 
                      ? [...selections.occupation, option]
                      : selections.occupation.filter(o => o !== option);
                    handleSelection("occupation", newOccupations);
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-left text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
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
              {steps.map((_, index) => (
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
              {steps[currentStep].title}
            </DialogTitle>
            <p className="text-gray-600">{steps[currentStep].subtitle}</p>
          </div>
        </DialogHeader>

        <div className="py-8">
          {renderStepContent()}
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
            {currentStep === steps.length - 1 ? "See Templates" : "Next"}
            {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuidedFilterModal;
