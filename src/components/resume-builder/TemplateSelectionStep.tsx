
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

// Mock resume preview components for each template
const ResumePreview = ({ template }: { template: Template }) => {
  const getPreviewContent = () => {
    switch (template.id) {
      case "professional":
        return (
          <div className="bg-white text-black text-xs p-4 h-full">
            <div className="border-b-2 border-blue-600 pb-2 mb-3">
              <h3 className="font-bold text-sm">ALEXANDER TAYLOR</h3>
              <p className="text-xs text-gray-600">Senior Project Manager | Tech UI Implementation</p>
              <p className="text-xs text-gray-500">alexander@email.com | (555) 123-4567</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1">SUMMARY</h4>
                <p className="text-xs text-gray-700">Experienced project manager with 8+ years in tech...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1">EXPERIENCE</h4>
                <div className="text-xs">
                  <p className="font-medium">Senior Project Manager</p>
                  <p className="text-gray-600">Tech Solutions Inc. | 2020 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "modern":
        return (
          <div className="bg-white text-black text-xs p-4 h-full">
            <div className="text-center mb-3 pb-2 border-b">
              <h3 className="font-bold text-sm">ABIGAIL HALL</h3>
              <p className="text-xs text-gray-600">Marketing Specialist</p>
              <p className="text-xs text-gray-500">abigail@email.com | (555) 987-6543</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1 text-center">SUMMARY</h4>
                <p className="text-xs text-gray-700 text-center">Creative marketing professional with expertise...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 text-center">EXPERIENCE</h4>
                <div className="text-xs text-center">
                  <p className="font-medium">Marketing Specialist</p>
                  <p className="text-gray-600">Digital Agency | 2019 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "minimal":
        return (
          <div className="bg-white text-black text-xs p-4 h-full">
            <div className="mb-3">
              <h3 className="font-bold text-lg">AIDEN WILLIAMS</h3>
              <p className="text-xs text-gray-600">Software Developer</p>
              <p className="text-xs text-gray-500">aiden@email.com | (555) 456-7890</p>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-xs mb-1 uppercase tracking-wide">Experience</h4>
                <div className="text-xs">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Software Developer</p>
                      <p className="text-gray-600">Tech Corp</p>
                    </div>
                    <p className="text-gray-500">2021 - Present</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 uppercase tracking-wide">Skills</h4>
                <p className="text-xs text-gray-700">JavaScript, React, Node.js, Python</p>
              </div>
            </div>
          </div>
        );
      
      case "creative":
        return (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs p-4 h-full">
            <div className="mb-3">
              <h3 className="font-bold text-sm">MAYA CHEN</h3>
              <p className="text-xs opacity-90">UI/UX Designer</p>
              <p className="text-xs opacity-80">maya@email.com | (555) 321-0987</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1">ABOUT</h4>
                <p className="text-xs opacity-90">Creative designer passionate about user experience...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1">EXPERIENCE</h4>
                <div className="text-xs">
                  <p className="font-medium">Senior UI/UX Designer</p>
                  <p className="opacity-80">Design Studio | 2020 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "executive":
        return (
          <div className="bg-white text-black text-xs p-4 h-full border-l-4 border-emerald-600">
            <div className="mb-3">
              <h3 className="font-bold text-sm text-emerald-700">MAEVE DELANCY</h3>
              <p className="text-xs text-gray-600">Executive Operating Officer | Operations Management</p>
              <p className="text-xs text-gray-500">maeve@email.com | (555) 654-3210</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1 text-emerald-700">SUMMARY</h4>
                <p className="text-xs text-gray-700">Strategic executive with 15+ years of leadership...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 text-emerald-700">EXPERIENCE</h4>
                <div className="text-xs">
                  <p className="font-medium">Chief Operating Officer</p>
                  <p className="text-gray-600">Global Corp | 2018 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "tech":
        return (
          <div className="bg-gray-900 text-white text-xs p-4 h-full">
            <div className="mb-3 border-b border-blue-400 pb-2">
              <h3 className="font-bold text-sm text-blue-400">GRACE JACKSON</h3>
              <p className="text-xs">Senior Software Engineer | Full-Stack Development</p>
              <p className="text-xs opacity-80">grace@email.com | (555) 789-0123</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1 text-blue-400">SUMMARY</h4>
                <p className="text-xs opacity-90">Full-stack developer with expertise in modern frameworks...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 text-blue-400">EXPERIENCE</h4>
                <div className="text-xs">
                  <p className="font-medium">Senior Software Engineer</p>
                  <p className="opacity-80">Tech Innovations | 2019 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className={`${template.color} text-white text-xs p-4 h-full flex items-center justify-center`}>
            <span className="font-semibold">{template.name} Preview</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-80 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {getPreviewContent()}
    </div>
  );
};

const TemplateSelectionStep = ({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect, 
  onContinue 
}: TemplateSelectionStepProps) => {
  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Please select a template for your resume.</h2>
        <p className="text-xl text-gray-600">
          You can always change it later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <CardContent className="p-4">
              <div className="relative">
                <ResumePreview template={template} />
                {selectedTemplate === template.id && (
                  <div className="absolute -top-2 -right-2">
                    <CheckCircle className="h-6 w-6 text-primary-600 bg-white rounded-full" />
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
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
