
import { FileText, Search, BarChart, Zap, Users, Shield } from "lucide-react";

const features = [
  {
    name: "Resume Analysis",
    description:
      "Upload your resume and get instant feedback on ATS compatibility, formatting, and content quality.",
    icon: FileText,
  },
  {
    name: "Job Description Matching",
    description:
      "Compare your resume against job descriptions to optimize keyword matching and skills alignment.",
    icon: Search,
  },
  {
    name: "ATS Score Tracking",
    description:
      "Track your resume's ATS score improvements over time as you make suggested changes.",
    icon: BarChart,
  },
  {
    name: "Smart Resume Builder",
    description:
      "Build professional resumes with templates optimized for your industry and target positions.",
    icon: Zap,
  },
  {
    name: "Industry Insights",
    description:
      "Get tailored advice based on industry standards and hiring trends for your target positions.",
    icon: Users,
  },
  {
    name: "Privacy First",
    description:
      "Your resume data is handled with enterprise-grade security and never shared with third parties.",
    icon: Shield,
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
              <div key={feature.name} className="pt-6">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
