
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  color: string;
  category: string;
  imageUrl?: string;
}

interface TemplatePreviewModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const TemplatePreviewModal = ({ 
  template, 
  isOpen, 
  onClose, 
  onSelect, 
  isSelected 
}: TemplatePreviewModalProps) => {
  const getFullPreviewContent = () => {
    switch (template.id) {
      case "professional":
        return (
          <div className="bg-white text-black p-8 min-h-[600px]">
            <div className="border-b-4 border-blue-600 pb-4 mb-6">
              <h1 className="text-2xl font-bold">ALEXANDER TAYLOR</h1>
              <p className="text-lg text-gray-600">Senior Project Manager | Tech UI Implementation</p>
              <p className="text-sm text-gray-500">alexander@email.com | (555) 123-4567 | LinkedIn: linkedin.com/in/alexander-taylor</p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm text-gray-700">
                  Experienced project manager with 8+ years in tech industry, specializing in UI/UX implementation 
                  and cross-functional team leadership. Proven track record of delivering complex projects on time 
                  and within budget while maintaining high quality standards.
                </p>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Senior Project Manager</h3>
                        <p className="text-gray-600">Tech Solutions Inc. | San Francisco, CA</p>
                      </div>
                      <span className="text-sm text-gray-500">2020 - Present</span>
                    </div>
                    <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                      <li>Led cross-functional teams of 12+ developers and designers</li>
                      <li>Implemented agile methodologies resulting in 30% faster delivery</li>
                      <li>Managed $2M+ project budgets with 98% success rate</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold">Master of Business Administration</h3>
                  <p className="text-gray-600">Stanford University | Stanford, CA | 2018</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {["Project Management", "Agile/Scrum", "Team Leadership", "Budget Management", "Risk Assessment"].map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 min-h-[600px]">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">MAYA CHEN</h1>
              <p className="text-xl opacity-90">UI/UX Designer</p>
              <p className="text-sm opacity-80">maya@email.com | (555) 321-0987 | Portfolio: mayachen.design</p>
            </div>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-3">ABOUT ME</h2>
                <p className="opacity-90">
                  Creative designer passionate about user experience and visual storytelling. 
                  Specialized in creating intuitive digital experiences that bridge the gap 
                  between user needs and business objectives.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-3">EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">Senior UI/UX Designer</h3>
                        <p className="opacity-80">Design Studio | New York, NY</p>
                      </div>
                      <span className="text-sm opacity-70">2020 - Present</span>
                    </div>
                    <ul className="mt-2 opacity-90 list-disc list-inside space-y-1">
                      <li>Designed user interfaces for 25+ mobile and web applications</li>
                      <li>Increased user engagement by 45% through UX optimization</li>
                      <li>Led design thinking workshops for cross-functional teams</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-bold mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"].map((skill) => (
                    <span key={skill} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        );

      default:
        return (
          <div className={`${template.color} text-white p-8 min-h-[600px] flex items-center justify-center`}>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">{template.name} Template</h1>
              <p className="text-xl">Full preview coming soon...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-bold">{template.name} Template</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{template.category}</Badge>
              {isSelected && (
                <Badge variant="default" className="bg-primary-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Selected
                </Badge>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            {getFullPreviewContent()}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-gray-600">{template.description}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={onSelect}
              className={isSelected ? "bg-primary-600" : ""}
            >
              {isSelected ? "Selected" : "Select Template"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
