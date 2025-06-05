
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import TemplatePreviewModal from "./TemplatePreviewModal";
import TemplateFilters, { FilterState } from "./TemplateFilters";
import { getTemplatePreview } from "./TemplatePreviewComponents";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  layout: string;
  columns: string;
  style: string;
  headshot: string;
  occupation: string[];
}

interface TemplateSelectionStepProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onContinue: () => void;
}

// Enhanced template data with filter properties
const enhancedTemplates: Template[] = [
  {
    id: "double-column",
    name: "Double Column",
    description: "Professional layout with sidebar for skills and contact",
    color: "bg-blue-600",
    category: "Professional",
    layout: "two-column",
    columns: "2 columns",
    style: "Traditional",
    headshot: "With photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated dark sidebar with clean typography",
    color: "bg-purple-600",
    category: "Professional",
    layout: "sidebar-dark",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Creative", "Management & Executive"]
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple Ivy League style",
    color: "bg-gray-800",
    category: "Simple",
    layout: "single-column",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "modern-accent",
    name: "Modern Accent",
    description: "Contemporary design with color highlights",
    color: "bg-emerald-600",
    category: "Modern",
    layout: "accent-modern",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Management & Executive"]
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Traditional corporate format",
    color: "bg-indigo-600",
    category: "Business",
    layout: "corporate",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Bold design for creative professionals",
    color: "bg-rose-600",
    category: "Creative",
    layout: "portfolio",
    columns: "1 column",
    style: "Creative",
    headshot: "Without photo",
    occupation: ["Creative", "Retail & Sales"]
  },
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Modern template for tech industry",
    color: "bg-cyan-600",
    category: "Technology",
    layout: "tech-grid",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Office & Administrative Support", "Business & Finance"]
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium layout for senior positions",
    color: "bg-amber-600",
    category: "Executive",
    layout: "executive",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Management & Executive"]
  }
];

const TemplateSelectionStep = ({ 
  selectedTemplate, 
  onTemplateSelect, 
  onContinue 
}: TemplateSelectionStepProps) => {
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(enhancedTemplates);

  const handleTemplatePreview = (template: Template) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleFiltersChange = (filters: FilterState) => {
    let filtered = enhancedTemplates;

    // Apply headshot filter
    if (filters.headshot.length > 0) {
      filtered = filtered.filter(template => 
        filters.headshot.includes(template.headshot)
      );
    }

    // Apply columns filter
    if (filters.columns.length > 0) {
      filtered = filtered.filter(template => 
        filters.columns.includes(template.columns)
      );
    }

    // Apply style filter
    if (filters.style.length > 0) {
      filtered = filtered.filter(template => 
        filters.style.includes(template.style)
      );
    }

    // Apply occupation filter
    if (filters.occupation.length > 0) {
      filtered = filtered.filter(template => 
        template.occupation.some(occ => filters.occupation.includes(occ))
      );
    }

    setFilteredTemplates(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar - Filters */}
        <TemplateFilters onFiltersChange={handleFiltersChange} />
        
        {/* Main Content */}
        <div className="flex-1 py-8 px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Best templates for 10+ years of experience
            </h1>
            <p className="text-lg text-gray-600">
              You can always change your template later.
            </p>
          </div>

          {/* Template Grid - 4 columns */}
          <RadioGroup 
            value={selectedTemplate} 
            onValueChange={onTemplateSelect}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          >
            {filteredTemplates.map((template) => (
              <div key={template.id} className="relative group">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    selectedTemplate === template.id 
                      ? 'ring-4 ring-primary-500 shadow-xl scale-[1.02] border-primary-500' 
                      : 'hover:shadow-lg border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => onTemplateSelect(template.id)}
                >
                  <CardContent className="p-0 relative">
                    {/* Template Preview */}
                    <div className="relative h-[400px] bg-white rounded-t-lg overflow-hidden">
                      {getTemplatePreview(template.id)}
                      
                      {/* Selection Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                      
                      {/* Radio button indicator */}
                      <div className="absolute top-3 left-3 z-10">
                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className={`w-5 h-5 shadow-lg border-2 ${
                            selectedTemplate === template.id 
                              ? 'border-primary-600 bg-primary-600' 
                              : 'border-white bg-white'
                          }`}
                        />
                      </div>

                      {/* Selected indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 z-10 animate-scale-in">
                          <div className="bg-primary-600 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}

                      {/* "RECOMMENDED" badge for certain templates */}
                      {(template.id === 'creative-portfolio' || template.id === 'double-column' || template.id === 'executive') && (
                        <div className="absolute bottom-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          RECOMMENDED
                        </div>
                      )}

                      {/* Preview button overlay */}
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplatePreview(template);
                        }}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg font-medium"
                        >
                          Full Preview
                        </Button>
                      </div>
                    </div>
                    
                    {/* Template Info */}
                    <div className="p-4 bg-white">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                      
                      {/* Color palette indicators */}
                      <div className="flex gap-1 mb-2">
                        {template.id === 'double-column' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-blue-800"></div>
                            <div className="w-4 h-4 rounded-full bg-green-600"></div>
                            <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
                            <div className="w-4 h-4 rounded-full bg-red-600"></div>
                            <div className="w-4 h-4 rounded-full bg-indigo-800"></div>
                          </>
                        )}
                        {template.id === 'elegant' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                            <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                            <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                            <div className="w-4 h-4 rounded-full bg-green-400"></div>
                          </>
                        )}
                        {template.id === 'executive' && (
                          <>
                            <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-600"></div>
                            <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                            <div className="w-4 h-4 rounded-full bg-green-400"></div>
                            <div className="w-4 h-4 rounded-full bg-red-400"></div>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded font-medium">
                          {template.category}
                        </span>
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded font-medium">
                          {template.columns}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </RadioGroup>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              onClick={onContinue}
              disabled={!selectedTemplate}
              size="lg"
              className={`px-12 py-4 text-lg font-semibold transition-all duration-300 ${
                selectedTemplate 
                  ? 'bg-primary-600 hover:bg-primary-700 hover:scale-105 shadow-lg' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedTemplate 
                ? `Use ${enhancedTemplates.find(t => t.id === selectedTemplate)?.name} Template` 
                : 'Select a Template to Continue'
              }
            </Button>
            
            {selectedTemplate && (
              <p className="mt-4 text-sm text-gray-600">
                You can always change your template later in the builder
              </p>
            )}
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
      </div>
    </div>
  );
};

export default TemplateSelectionStep;
