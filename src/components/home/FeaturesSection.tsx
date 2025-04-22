
import { FileText, Search, BarChart, Zap, Users, Shield } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const features = [
  {
    name: "Resume Analysis",
    description: "Upload your resume and get instant feedback on ATS compatibility, formatting, and content quality.",
    icon: FileText,
    benefits: [
      "In-depth analysis of resume structure and content",
      "Real-time ATS compatibility scoring",
      "Actionable formatting suggestions",
      "Keyword optimization recommendations"
    ]
  },
  {
    name: "Job Description Matching",
    description: "Compare your resume against job descriptions to optimize keyword matching and skills alignment.",
    icon: Search,
    benefits: [
      "Automated skills gap analysis",
      "Keyword optimization suggestions",
      "Industry-specific terminology matching",
      "Tailored content recommendations"
    ]
  },
  {
    name: "ATS Score Tracking",
    description: "Track your resume's ATS score improvements over time as you make suggested changes.",
    icon: BarChart,
    benefits: [
      "Historical performance tracking",
      "Progress visualization",
      "Improvement metrics",
      "Success probability scoring"
    ]
  },
  {
    name: "Smart Resume Builder",
    description: "Build professional resumes with templates optimized for your industry and target positions.",
    icon: Zap,
    benefits: [
      "Industry-specific templates",
      "ATS-optimized formatting",
      "Professional layout options",
      "Easy content organization"
    ]
  },
  {
    name: "Industry Insights",
    description: "Get tailored advice based on industry standards and hiring trends for your target positions.",
    icon: Users,
    benefits: [
      "Real-time industry trends",
      "Hiring pattern analysis",
      "Skills demand tracking",
      "Career path recommendations"
    ]
  },
  {
    name: "Privacy First",
    description: "Your resume data is handled with enterprise-grade security and never shared with third parties.",
    icon: Shield,
    benefits: [
      "End-to-end encryption",
      "Secure data storage",
      "GDPR compliance",
      "Data deletion control"
    ]
  },
];

const FeaturesSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to land your dream job
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Our AI-powered tools analyze and improve your resume to help you stand out to employers and pass ATS systems.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <HoverCard key={feature.name} openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="pt-6 cursor-pointer transition-transform duration-200 hover:scale-105">
                    <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8 h-full">
                      <div className="-mt-6">
                        <div>
                          <span className="inline-flex items-center justify-center rounded-md bg-primary-600 p-3 shadow-lg">
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{feature.name} Benefits</h4>
                    <ul className="text-sm space-y-1">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-muted-foreground flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary-600"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
