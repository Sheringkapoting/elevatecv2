
import { Card, CardContent } from "@/components/ui/card";
import { LayoutOption } from "./types";

interface LayoutStepProps {
  selectedLayout: string;
  onLayoutSelect: (layout: string) => void;
}

const layoutOptions: LayoutOption[] = [
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

const LayoutStep = ({ selectedLayout, onLayoutSelect }: LayoutStepProps) => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
      {layoutOptions.map((option) => (
        <Card 
          key={option.id}
          className={`cursor-pointer border-2 ${selectedLayout === option.id ? 'border-blue-500' : 'border-gray-200'}`}
          onClick={() => onLayoutSelect(option.id)}
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
};

export default LayoutStep;
