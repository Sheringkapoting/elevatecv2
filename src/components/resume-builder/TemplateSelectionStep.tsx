import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import TemplatePreviewModal from "./TemplatePreviewModal";
import TemplateFilters, { FilterState } from "./TemplateFilters";
import { getTemplatePreview } from "./TemplatePreviewComponents";
import ColorPaletteSelector from "./ColorPaletteSelector";
import { ColorPalette, TemplateProvider, useTemplate } from "@/contexts/TemplateContext";

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

// Enhanced template data with all templates from the images
const enhancedTemplates: Template[] = [
  // First image templates
  {
    id: "double-column",
    name: "Double Column",
    description: "Professional layout with teal sidebar for skills and contact",
    color: "bg-teal-600",
    category: "Professional",
    layout: "two-column",
    columns: "2 columns",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "ivy-league",
    name: "Ivy League",
    description: "Clean and simple traditional style",
    color: "bg-gray-600",
    category: "Simple",
    layout: "single-column",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated dark sidebar with professional styling",
    color: "bg-slate-700",
    category: "Professional",
    layout: "sidebar-dark",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Management & Executive"]
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Modern green sidebar with clean typography",
    color: "bg-green-500",
    category: "Modern",
    layout: "sidebar-green",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Management & Executive", "Business & Finance"]
  },
  
  // Second image templates
  {
    id: "polished",
    name: "Polished",
    description: "Professional teal design with achievement highlights",
    color: "bg-teal-600",
    category: "Professional",
    layout: "sidebar-teal",
    columns: "2 columns",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Management & Executive"]
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean modern layout with blue accents",
    color: "bg-blue-500",
    category: "Modern",
    layout: "modern-blue",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Retail & Sales"]
  },
  {
    id: "creative",
    name: "Creative",
    description: "Dark professional design with photo emphasis",
    color: "bg-slate-800",
    category: "Creative",
    layout: "creative-dark",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Orange timeline design for career progression",
    color: "bg-orange-500",
    category: "Modern",
    layout: "timeline-orange",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  
  // Third image templates
  {
    id: "stylish",
    name: "Stylish",
    description: "Purple minimalist design for tech professionals",
    color: "bg-purple-600",
    category: "Modern",
    layout: "stylish-purple",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "single-column",
    name: "Single Column",
    description: "Traditional single column layout",
    color: "bg-gray-600",
    category: "Simple",
    layout: "single-traditional",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Retail & Sales", "Business & Finance"]
  },
  {
    id: "elegant-with-logos",
    name: "Elegant with Logos",
    description: "Teal sidebar design with company logos",
    color: "bg-teal-600",
    category: "Professional",
    layout: "elegant-logos",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  {
    id: "double-column-with-logos",
    name: "Double Column with Logos",
    description: "Blue header design with structured layout",
    color: "bg-blue-600",
    category: "Professional",
    layout: "double-logos",
    columns: "2 columns",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  
  // Fourth image templates
  {
    id: "compact",
    name: "Compact",
    description: "Blue sidebar compact design",
    color: "bg-blue-500",
    category: "Professional",
    layout: "compact-blue",
    columns: "2 columns",
    style: "Traditional",
    headshot: "With photo",
    occupation: ["Education & Library", "Office & Administrative Support"]
  },
  {
    id: "modern-with-logos",
    name: "Modern with Logos",
    description: "Red accent modern layout with company integration",
    color: "bg-red-500",
    category: "Modern",
    layout: "modern-logos",
    columns: "1 column",
    style: "Contemporary",
    headshot: "Without photo",
    occupation: ["Computer & Technology", "Retail & Sales"]
  },
  {
    id: "multicolumn",
    name: "Multicolumn",
    description: "Multi-section layout with photo emphasis",
    color: "bg-blue-600",
    category: "Professional",
    layout: "multi-section",
    columns: "2 columns",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Business & Finance", "Management & Executive"]
  },
  {
    id: "timeline-with-logos",
    name: "Timeline with Logos",
    description: "Green timeline layout with company logos",
    color: "bg-green-500",
    category: "Modern",
    layout: "timeline-logos",
    columns: "1 column",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  },
  
  // Fifth image templates
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout",
    color: "bg-gray-800",
    category: "Simple",
    layout: "classic-traditional",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Office & Administrative Support"]
  },
  {
    id: "ivy-league-with-logos",
    name: "Ivy League with Logos",
    description: "Clean traditional design with company integration",
    color: "bg-gray-600",
    category: "Simple",
    layout: "ivy-logos",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Business & Finance", "Education & Library"]
  },
  {
    id: "high-performer",
    name: "High Performer",
    description: "Blue professional layout for executives",
    color: "bg-blue-600",
    category: "Executive",
    layout: "high-performer",
    columns: "1 column",
    style: "Traditional",
    headshot: "Without photo",
    occupation: ["Management & Executive", "Business & Finance"]
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean minimal design with photo accent",
    color: "bg-gray-800",
    category: "Simple",
    layout: "minimal-clean",
    columns: "1 column",
    style: "Contemporary",
    headshot: "With photo",
    occupation: ["Computer & Technology", "Arts & Entertainment"]
  }
];

// Color palettes for each template
const templateColorPalettes: Record<string, ColorPalette[]> = {
  "double-column": [
    { id: "blue", name: "Blue", primary: "#1e40af", secondary: "#3b82f6", accent: "#60a5fa", text: "#1f2937", background: "#ffffff", colors: ["#1e40af", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#6366f1"] },
    { id: "green", name: "Green", primary: "#059669", secondary: "#10b981", accent: "#34d399", text: "#1f2937", background: "#ffffff", colors: ["#059669", "#10b981", "#34d399"] },
    { id: "purple", name: "Purple", primary: "#7c3aed", secondary: "#8b5cf6", accent: "#a78bfa", text: "#1f2937", background: "#ffffff", colors: ["#7c3aed", "#8b5cf6", "#a78bfa"] },
    { id: "orange", name: "Orange", primary: "#ea580c", secondary: "#f97316", accent: "#fb923c", text: "#1f2937", background: "#ffffff", colors: ["#ea580c", "#f97316", "#fb923c"] },
    { id: "red", name: "Red", primary: "#dc2626", secondary: "#ef4444", accent: "#f87171", text: "#1f2937", background: "#ffffff", colors: ["#dc2626", "#ef4444", "#f87171"] },
    { id: "indigo", name: "Indigo", primary: "#4338ca", secondary: "#6366f1", accent: "#818cf8", text: "#1f2937", background: "#ffffff", colors: ["#4338ca", "#6366f1", "#818cf8"] }
  ],
  "elegant": [
    { id: "teal", name: "Teal", primary: "#0d9488", secondary: "#14b8a6", accent: "#5eead4", text: "#1f2937", background: "#ffffff", colors: ["#0d9488", "#14b8a6", "#5eead4"] },
    { id: "blue", name: "Blue", primary: "#2563eb", secondary: "#3b82f6", accent: "#93c5fd", text: "#1f2937", background: "#ffffff", colors: ["#2563eb", "#3b82f6", "#93c5fd"] },
    { id: "pink", name: "Pink", primary: "#db2777", secondary: "#ec4899", accent: "#f9a8d4", text: "#1f2937", background: "#ffffff", colors: ["#db2777", "#ec4899", "#f9a8d4"] },
    { id: "orange", name: "Orange", primary: "#ea580c", secondary: "#f97316", accent: "#fdba74", text: "#1f2937", background: "#ffffff", colors: ["#ea580c", "#f97316", "#fdba74"] },
    { id: "gray", name: "Gray", primary: "#4b5563", secondary: "#6b7280", accent: "#9ca3af", text: "#1f2937", background: "#ffffff", colors: ["#4b5563", "#6b7280", "#9ca3af"] },
    { id: "emerald", name: "Emerald", primary: "#059669", secondary: "#10b981", accent: "#6ee7b7", text: "#1f2937", background: "#ffffff", colors: ["#059669", "#10b981", "#6ee7b7"] }
  ],
  "executive": [
    { id: "rose", name: "Rose", primary: "#e11d48", secondary: "#f43f5e", accent: "#fda4af", text: "#1f2937", background: "#ffffff", colors: ["#e11d48", "#f43f5e", "#fda4af"] },
    { id: "blue", name: "Blue", primary: "#2563eb", secondary: "#3b82f6", accent: "#93c5fd", text: "#1f2937", background: "#ffffff", colors: ["#2563eb", "#3b82f6", "#93c5fd"] },
    { id: "amber", name: "Amber", primary: "#d97706", secondary: "#f59e0b", accent: "#fbbf24", text: "#1f2937", background: "#ffffff", colors: ["#d97706", "#f59e0b", "#fbbf24"] },
    { id: "slate", name: "Slate", primary: "#475569", secondary: "#64748b", accent: "#94a3b8", text: "#1f2937", background: "#ffffff", colors: ["#475569", "#64748b", "#94a3b8"] },
    { id: "emerald", name: "Emerald", primary: "#059669", secondary: "#10b981", accent: "#6ee7b7", text: "#1f2937", background: "#ffffff", colors: ["#059669", "#10b981", "#6ee7b7"] },
    { id: "red", name: "Red", primary: "#dc2626", secondary: "#ef4444", accent: "#fca5a5", text: "#1f2937", background: "#ffffff", colors: ["#dc2626", "#ef4444", "#fca5a5"] }
  ]
};

// Default palette for templates without specific palettes
const defaultPalettes: ColorPalette[] = [
  { id: "default", name: "Default", primary: "#3b82f6", secondary: "#60a5fa", accent: "#93c5fd", text: "#1f2937", background: "#ffffff", colors: ["#3b82f6", "#60a5fa", "#93c5fd"] }
];

const TemplateSelectionContent = ({ 
  selectedTemplate, 
  onTemplateSelect, 
  onContinue 
}: TemplateSelectionStepProps) => {
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(enhancedTemplates);
  const { setSelectedTemplate } = useTemplate();

  const handleTemplatePreview = (template: Template) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId);
    setSelectedTemplate(templateId);
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

          {/* Template Grid - 3 columns responsive */}
          <RadioGroup 
            value={selectedTemplate} 
            onValueChange={handleTemplateSelect}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          >
            {filteredTemplates.map((template) => (
              <div key={template.id} className="relative group">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    selectedTemplate === template.id 
                      ? 'ring-4 ring-primary-500 shadow-xl scale-[1.02] border-primary-500' 
                      : 'hover:shadow-lg border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
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
                      
                      {/* Color palette selectors */}
                      <ColorPaletteSelector 
                        templateId={template.id}
                        palettes={templateColorPalettes[template.id] || defaultPalettes}
                      />
                      
                      <div className="flex items-center gap-2 mt-3">
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
                handleTemplateSelect(previewTemplate.id);
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

const TemplateSelectionStep = (props: TemplateSelectionStepProps) => {
  return (
    <TemplateProvider>
      <TemplateSelectionContent {...props} />
    </TemplateProvider>
  );
};

export default TemplateSelectionStep;
