
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  imageUrl?: string;
}

interface ResumeTemplatesGalleryProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const ResumeTemplatesGallery = ({
  templates,
  selectedTemplate,
  onTemplateSelect,
}: ResumeTemplatesGalleryProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resume Template</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsGalleryOpen(!isGalleryOpen)}
        >
          {isGalleryOpen ? "Close Gallery" : "Browse Templates"}
        </Button>
      </div>
      
      {/* Current template summary */}
      {!isGalleryOpen && (
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className={`w-16 h-20 ${templates.find(t => t.id === selectedTemplate)?.color} rounded-md flex-shrink-0`}>
            {/* Template thumbnail */}
          </div>
          <div>
            <h4 className="font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</h4>
            <p className="text-sm text-gray-500">{templates.find(t => t.id === selectedTemplate)?.description}</p>
          </div>
        </div>
      )}
      
      {/* Templates gallery */}
      {isGalleryOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id ? "ring-2 ring-primary-500" : ""
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <div 
                    className={`w-full h-40 ${template.color} rounded-md mb-3`}
                    style={{
                      backgroundImage: template.imageUrl ? `url(${template.imageUrl})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Template preview image or color */}
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeTemplatesGallery;
