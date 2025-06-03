
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
  layout: string;
  imageUrl?: string;
}

interface TemplateSelectionStepProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  onContinue: () => void;
}

// Enhanced template data with layout types
const enhancedTemplates = [
  {
    id: "double-column",
    name: "Double Column",
    description: "Professional layout with sidebar for skills and contact",
    color: "bg-blue-600",
    category: "Professional",
    layout: "two-column"
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated dark sidebar with clean typography",
    color: "bg-purple-600",
    category: "Professional",
    layout: "sidebar-dark"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean and simple Ivy League style",
    color: "bg-gray-800",
    category: "Simple",
    layout: "single-column"
  },
  {
    id: "modern-accent",
    name: "Modern Accent",
    description: "Contemporary design with color highlights",
    color: "bg-emerald-600",
    category: "Modern",
    layout: "accent-modern"
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Traditional corporate format",
    color: "bg-indigo-600",
    category: "Business",
    layout: "corporate"
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Bold design for creative professionals",
    color: "bg-rose-600",
    category: "Creative",
    layout: "portfolio"
  },
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Modern template for tech industry",
    color: "bg-cyan-600",
    category: "Technology",
    layout: "tech-grid"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium layout for senior positions",
    color: "bg-amber-600",
    category: "Executive",
    layout: "executive"
  }
];

// Full resume preview components for each template
const FullResumePreview = ({ template }: { template: Template }) => {
  const getPreviewContent = () => {
    switch (template.layout) {
      case "two-column":
        return (
          <div className="bg-white text-black text-[10px] h-full min-h-[600px] shadow-lg flex">
            {/* Left Sidebar */}
            <div className="w-1/3 bg-blue-50 p-4 border-r-2 border-blue-200">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-2 flex items-center justify-center text-blue-700 font-bold text-lg">
                  JS
                </div>
                <h1 className="text-lg font-bold text-blue-800">JOHN SMITH</h1>
                <p className="text-sm text-blue-600">Software Engineer</p>
              </div>
              
              <div className="space-y-4">
                <section>
                  <h3 className="font-bold mb-2 text-blue-800 text-xs">CONTACT</h3>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p>john@email.com</p>
                    <p>(555) 123-4567</p>
                    <p>San Francisco, CA</p>
                    <p>linkedin.com/in/johnsmith</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="font-bold mb-2 text-blue-800 text-xs">SKILLS</h3>
                  <div className="space-y-1">
                    {["JavaScript", "React", "Node.js", "Python", "SQL", "AWS"].map((skill) => (
                      <div key={skill} className="bg-blue-100 px-2 py-1 rounded text-xs text-blue-800">{skill}</div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="font-bold mb-2 text-blue-800 text-xs">EDUCATION</h3>
                  <div className="text-xs">
                    <p className="font-semibold">BS Computer Science</p>
                    <p className="text-gray-700">Stanford University</p>
                    <p className="text-gray-600">2019</p>
                  </div>
                </section>
              </div>
            </div>
            
            {/* Right Main Content */}
            <div className="w-2/3 p-4">
              <div className="mb-4">
                <h2 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">PROFESSIONAL SUMMARY</h2>
                <p className="text-xs text-gray-700">
                  Experienced software engineer with 5+ years developing scalable web applications. 
                  Specialized in full-stack development with modern frameworks and cloud technologies.
                </p>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">EXPERIENCE</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Senior Software Engineer</h3>
                        <p className="text-gray-600 text-xs">Tech Corp | San Francisco, CA</p>
                      </div>
                      <span className="text-xs text-gray-500">2021 - Present</span>
                    </div>
                    <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Led development of microservices architecture</li>
                      <li>Improved application performance by 40%</li>
                      <li>Mentored team of 4 junior developers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Software Engineer</h3>
                        <p className="text-gray-600 text-xs">StartupXYZ | Palo Alto, CA</p>
                      </div>
                      <span className="text-xs text-gray-500">2019 - 2021</span>
                    </div>
                    <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Built responsive web applications using React</li>
                      <li>Developed RESTful APIs with Node.js</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">PROJECTS</h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold text-xs">E-commerce Platform</h3>
                    <p className="text-xs text-gray-700">Built full-stack application with React, Node.js, and MongoDB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "sidebar-dark":
        return (
          <div className="bg-white text-black text-[10px] h-full min-h-[600px] shadow-lg flex">
            {/* Dark Sidebar */}
            <div className="w-1/3 bg-gray-900 text-white p-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg">
                  SJ
                </div>
                <h1 className="text-lg font-bold">SARAH JOHNSON</h1>
                <p className="text-sm text-purple-300">UX Designer</p>
              </div>
              
              <div className="space-y-4">
                <section>
                  <h3 className="font-bold mb-2 text-purple-400 text-xs">CONTACT</h3>
                  <div className="space-y-1 text-xs">
                    <p>sarah@email.com</p>
                    <p>(555) 987-6543</p>
                    <p>New York, NY</p>
                    <p>behance.net/sarahjohnson</p>
                  </div>
                </section>
                
                <section>
                  <h3 className="font-bold mb-2 text-purple-400 text-xs">SKILLS</h3>
                  <div className="space-y-1">
                    {["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research"].map((skill) => (
                      <div key={skill} className="bg-purple-800 px-2 py-1 rounded text-xs">{skill}</div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="font-bold mb-2 text-purple-400 text-xs">LANGUAGES</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>English</span>
                      <span>Native</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spanish</span>
                      <span>Fluent</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-2/3 p-4">
              <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-900 mb-1">SARAH JOHNSON</h1>
                <p className="text-sm text-purple-600 mb-2">UX Designer</p>
                <p className="text-xs text-gray-700">
                  Creative UX designer with passion for user-centered design and 4+ years 
                  of experience creating intuitive digital experiences.
                </p>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm font-bold text-purple-600 mb-2">EXPERIENCE</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Senior UX Designer</h3>
                        <p className="text-gray-600 text-xs">Design Studio | New York, NY</p>
                      </div>
                      <span className="text-xs text-gray-500">2022 - Present</span>
                    </div>
                    <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Led UX design for 15+ mobile and web applications</li>
                      <li>Increased user engagement by 35% through design optimization</li>
                      <li>Conducted user research and usability testing</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm font-bold text-purple-600 mb-2">EDUCATION</h2>
                <div>
                  <h3 className="font-semibold text-xs">Master of Design</h3>
                  <p className="text-gray-600 text-xs">Parsons School of Design | 2020</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "single-column":
        return (
          <div className="bg-white text-black text-[10px] p-6 h-full min-h-[600px] shadow-lg">
            <div className="text-center mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-light mb-1">MICHAEL CHEN</h1>
              <p className="text-sm text-gray-600">Data Scientist</p>
              <p className="text-xs text-gray-500">michael@email.com | (555) 246-8135 | San Francisco, CA</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-sm font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Summary</h2>
                <p className="text-xs text-gray-700">
                  Data scientist with expertise in machine learning, statistical analysis, and data visualization. 
                  6+ years of experience transforming complex data into actionable business insights.
                </p>
              </section>
              
              <section>
                <h2 className="text-sm font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Experience</h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-xs">Senior Data Scientist</h3>
                        <p className="text-gray-600 text-xs">Tech Giants Inc.</p>
                      </div>
                      <p className="text-gray-500 text-xs">2021 - Present</p>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">Built ML models that increased revenue by $2M annually</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-xs">Data Analyst</h3>
                        <p className="text-gray-600 text-xs">Analytics Corp</p>
                      </div>
                      <p className="text-gray-500 text-xs">2019 - 2021</p>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">Developed predictive models and statistical reports</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-sm font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Education</h2>
                <div>
                  <h3 className="font-medium text-xs">PhD in Statistics</h3>
                  <p className="text-gray-600 text-xs">Stanford University | 2019</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-sm font-light mb-3 uppercase tracking-wide border-b border-gray-200 pb-1">Skills</h2>
                <p className="text-xs text-gray-700">Python, R, SQL, TensorFlow, Tableau, AWS, Machine Learning, Statistics</p>
              </section>
            </div>
          </div>
        );

      case "accent-modern":
        return (
          <div className="bg-white text-black text-[10px] h-full min-h-[600px] shadow-lg">
            <div className="bg-emerald-600 text-white p-4 mb-4">
              <h1 className="text-xl font-bold">EMMA RODRIGUEZ</h1>
              <p className="text-sm opacity-90">Marketing Manager</p>
              <p className="text-xs opacity-80">emma@email.com | (555) 789-0123 | Los Angeles, CA</p>
            </div>
            
            <div className="px-4 space-y-4">
              <section>
                <h2 className="text-sm font-bold text-emerald-600 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs text-gray-700">
                  Results-driven marketing manager with 7+ years of experience in digital marketing, 
                  brand development, and campaign management. Proven track record of increasing brand 
                  awareness and driving revenue growth.
                </p>
              </section>
              
              <section>
                <h2 className="text-sm font-bold text-emerald-600 mb-2 flex items-center">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                  EXPERIENCE
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Marketing Manager</h3>
                        <p className="text-gray-600 text-xs">Digital Agency | Los Angeles, CA</p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">2020 - Present</span>
                    </div>
                    <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Increased brand awareness by 150% through digital campaigns</li>
                      <li>Managed $500K annual marketing budget</li>
                      <li>Led team of 8 marketing professionals</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Marketing Specialist</h3>
                        <p className="text-gray-600 text-xs">Creative Studio | San Diego, CA</p>
                      </div>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">2017 - 2020</span>
                    </div>
                    <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Developed social media strategies for 25+ clients</li>
                      <li>Created content that generated 2M+ impressions monthly</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <div className="grid grid-cols-2 gap-4">
                <section>
                  <h2 className="text-sm font-bold text-emerald-600 mb-2 flex items-center">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                    EDUCATION
                  </h2>
                  <div>
                    <h3 className="font-semibold text-xs">MBA in Marketing</h3>
                    <p className="text-gray-600 text-xs">UCLA | 2017</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-sm font-bold text-emerald-600 mb-2 flex items-center">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full mr-2"></div>
                    SKILLS
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    {["Digital Marketing", "SEO", "Analytics", "Branding"].map((skill) => (
                      <span key={skill} className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">{skill}</span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      case "corporate":
        return (
          <div className="bg-white text-black text-[10px] p-6 h-full min-h-[600px] shadow-lg">
            <div className="text-center mb-6 pb-4 border-b-2 border-indigo-600">
              <h1 className="text-2xl font-bold text-indigo-700">ROBERT WILLIAMS</h1>
              <p className="text-sm text-gray-600">Business Analyst</p>
              <p className="text-xs text-gray-500">robert@email.com | (555) 321-9876 | Chicago, IL</p>
            </div>
            
            <div className="space-y-5">
              <section>
                <h2 className="text-sm font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">PROFESSIONAL SUMMARY</h2>
                <p className="text-xs text-gray-700">
                  Experienced business analyst with 8+ years in financial services and consulting. 
                  Expertise in process improvement, data analysis, and strategic planning with proven 
                  track record of driving operational efficiency.
                </p>
              </section>
              
              <section>
                <h2 className="text-sm font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">PROFESSIONAL EXPERIENCE</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Senior Business Analyst</h3>
                        <p className="text-gray-600 text-xs">Financial Corp | Chicago, IL</p>
                      </div>
                      <span className="text-xs text-gray-500">2019 - Present</span>
                    </div>
                    <ul className="mt-2 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Led process improvement initiatives saving $1.2M annually</li>
                      <li>Analyzed business requirements for 10+ major projects</li>
                      <li>Collaborated with C-level executives on strategic planning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-xs">Business Analyst</h3>
                        <p className="text-gray-600 text-xs">Consulting Group | Milwaukee, WI</p>
                      </div>
                      <span className="text-xs text-gray-500">2016 - 2019</span>
                    </div>
                    <ul className="mt-2 text-xs text-gray-700 list-disc list-inside space-y-1">
                      <li>Conducted market research and competitive analysis</li>
                      <li>Developed business intelligence reports and dashboards</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <div className="grid grid-cols-2 gap-6">
                <section>
                  <h2 className="text-sm font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">EDUCATION</h2>
                  <div>
                    <h3 className="font-semibold text-xs">Master of Business Administration</h3>
                    <p className="text-gray-600 text-xs">Northwestern University | 2016</p>
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold text-xs">Bachelor of Economics</h3>
                    <p className="text-gray-600 text-xs">University of Chicago | 2014</p>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-sm font-bold text-indigo-700 mb-3 border-b border-indigo-200 pb-1">CORE COMPETENCIES</h2>
                  <div className="space-y-1">
                    {["Strategic Analysis", "Process Improvement", "Financial Modeling", "Data Analysis", "Project Management"].map((skill) => (
                      <div key={skill} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">{skill}</div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className={`${template.color} text-white text-xs p-4 h-full flex items-center justify-center min-h-[600px]`}>
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">{template.name}</h1>
              <p className="text-lg">Full preview available</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
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

  const templateData = enhancedTemplates;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Resume Template</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our collection of professional templates. Each template includes full resume previews 
            with realistic layouts designed to help you stand out.
          </p>
        </div>

        {/* Template Grid */}
        <RadioGroup 
          value={selectedTemplate} 
          onValueChange={onTemplateSelect}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {templateData.map((template) => (
            <div key={template.id} className="relative group">
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                  selectedTemplate === template.id 
                    ? 'ring-4 ring-primary-500 shadow-2xl scale-[1.02] border-primary-500' 
                    : 'hover:shadow-xl border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => onTemplateSelect(template.id)}
              >
                <CardContent className="p-0 relative">
                  {/* Template Preview */}
                  <div className="relative">
                    <FullResumePreview template={template} />
                    
                    {/* Selection Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                    
                    {/* Radio button indicator */}
                    <div className="absolute top-4 left-4 z-10">
                      <RadioGroupItem
                        value={template.id}
                        id={template.id}
                        className={`w-6 h-6 shadow-lg border-2 ${
                          selectedTemplate === template.id 
                            ? 'border-primary-600 bg-primary-600' 
                            : 'border-white bg-white'
                        }`}
                      />
                    </div>

                    {/* Selected indicator */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 z-10 animate-scale-in">
                        <div className="bg-primary-600 rounded-full p-1">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Preview button overlay */}
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg z-20"
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
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full font-medium">
                            {template.category}
                          </span>
                          <span className="inline-block px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                            {template.layout}
                          </span>
                        </div>
                      </div>
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
              ? `Use ${templateData.find(t => t.id === selectedTemplate)?.name} Template` 
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
  );
};

export default TemplateSelectionStep;
