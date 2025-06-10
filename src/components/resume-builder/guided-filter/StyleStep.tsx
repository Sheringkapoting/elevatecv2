
import { Card, CardContent } from "@/components/ui/card";
import { StyleOption } from "./types";

interface StyleStepProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const styleOptions: StyleOption[] = [
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

const StyleStep = ({ selectedStyle, onStyleSelect }: StyleStepProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
      {styleOptions.map((option) => (
        <Card 
          key={option.id}
          className={`cursor-pointer border-2 ${selectedStyle === option.id ? 'border-blue-500' : 'border-gray-200'}`}
          onClick={() => onStyleSelect(option.id)}
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
};

export default StyleStep;
