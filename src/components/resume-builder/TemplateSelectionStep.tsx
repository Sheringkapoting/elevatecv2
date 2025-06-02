
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  imageUrl?: string;
}

interface TemplateSelectionStepProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onContinue: () => void;
}

const TemplateSelectionStep = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect, 
  onContinue 
}: TemplateSelectionStepProps) => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h2>
        <p className="text-xl text-gray-600">
          Select a professional template that matches your industry and style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-primary-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardContent className="p-6">
              <div className="relative">
                <div 
                  className={`${template.color} h-32 mb-4 rounded-lg flex items-center justify-center`}
                >
                  {template.imageUrl ? (
                    <img 
                      src={template.imageUrl} 
                      alt={template.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-white font-semibold text-lg">{template.name}</span>
                  )}
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className="h-6 w-6 text-primary-600 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          disabled={!selectedTemplate}
          className="px-8 py-3 text-lg"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || 'Selected'} Template
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelectionStep;
