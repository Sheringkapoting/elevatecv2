
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import TemplatePreviewModal from "./TemplatePreviewModal";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
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

      case "elegant":
        return (
          <div className="bg-white text-black text-xs p-4 h-full">
            <div className="text-center mb-3 pb-3 border-b-2 border-gray-300">
              <h3 className="font-bold text-sm tracking-wide">SOPHIA RODRIGUEZ</h3>
              <p className="text-xs text-gray-600 italic">Business Analyst | Strategic Planning</p>
              <p className="text-xs text-gray-500">sophia@email.com | (555) 246-8135</p>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1 text-center">PROFESSIONAL SUMMARY</h4>
                <p className="text-xs text-gray-700">Results-driven business analyst with 6+ years of experience...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 text-center">PROFESSIONAL EXPERIENCE</h4>
                <div className="text-xs text-center">
                  <p className="font-medium">Senior Business Analyst</p>
                  <p className="text-gray-600">Fortune 500 Company | 2021 - Present</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "contemporary":
        return (
          <div className="bg-white text-black text-xs p-4 h-full">
            <div className="flex items-center mb-3 pb-2 border-b border-orange-400">
              <div className="w-8 h-8 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-white font-bold text-xs">
                JD
              </div>
              <div>
                <h3 className="font-bold text-sm">JORDAN DAVIS</h3>
                <p className="text-xs text-gray-600">Product Manager | Innovation</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold text-xs mb-1 text-orange-600">ABOUT ME</h4>
                <p className="text-xs text-gray-700">Innovative product manager driving digital transformation...</p>
              </div>
              <div>
                <h4 className="font-semibold text-xs mb-1 text-orange-600">WORK EXPERIENCE</h4>
                <div className="text-xs">
                  <p className="font-medium">Product Manager</p>
                  <p className="text-gray-600">StartupXYZ | 2020 - Present</p>
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
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const handleTemplatePreview = (template: Template) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h2>
        <p className="text-xl text-gray-600">
          Select a professional template that best represents your style. You can always change it later.
        </p>
      </div>

      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={onTemplateSelect}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary-400 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary-500 shadow-xl border-primary-500' 
                  : 'hover:shadow-lg border-gray-200'
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <ResumePreview template={template} />
                  
                  {/* Radio button indicator */}
                  <div className="absolute top-2 left-2">
                    <RadioGroupItem
                      value={template.id}
                      id={template.id}
                      className={`w-5 h-5 ${
                        selectedTemplate === template.id 
                          ? 'border-primary-600 bg-primary-600' 
                          : 'border-gray-300'
                      }`}
                    />
                  </div>

                  {/* Selected indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute -top-2 -right-2 animate-scale-in">
                      <CheckCircle className="h-6 w-6 text-primary-600 bg-white rounded-full shadow-md" />
                    </div>
                  )}

                  {/* Preview button overlay */}
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplatePreview(template);
                    }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{template.description}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {template.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          disabled={!selectedTemplate}
          size="lg"
          className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
        >
          Continue with {templates.find(t => t.id === selectedTemplate)?.name || 'Selected'} Template
        </Button>
      </div>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          onSelect={() => {
            onTemplateSelect(previewTemplate.id);
            setPreviewModalOpen(false);
          }}
          isSelected={selectedTemplate === previewTemplate.id}
        />
      )}
    </div>
  );
};

export default TemplateSelectionStep;
