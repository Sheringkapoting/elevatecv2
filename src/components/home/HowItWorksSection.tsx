
import { ArrowRight } from "lucide-react";

const steps = [
  {
    id: "01",
    name: "Upload Your Resume",
    description:
      "Upload your existing resume in PDF, Word, or other common formats. Our system will parse and analyze it.",
    imageSrc: "https://img.icons8.com/ios/100/147EFB/upload--v1.png",
  },
  {
    id: "02",
    name: "Add Job Descriptions",
    description:
      "Paste job descriptions you're applying for to receive tailored recommendations for each position.",
    imageSrc: "https://img.icons8.com/ios/100/147EFB/search--v1.png",
  },
  {
    id: "03",
    name: "Review Analysis & Scores",
    description:
      "Get detailed feedback on ATS compatibility, formatting, keywords, and content with actionable suggestions.",
    imageSrc: "https://img.icons8.com/ios/100/147EFB/combo-chart--v1.png",
  },
  {
    id: "04",
    name: "Optimize Your Resume",
    description:
      "Make the suggested improvements or use our builder to create an optimized resume from scratch.",
    imageSrc: "https://img.icons8.com/ios/100/147EFB/fine-print--v1.png",
  },
];

const HowItWorksSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-primary-600">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to a better resume
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            Our streamlined process makes it easy to improve your resume and increase your chances of landing interviews.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-full hidden transform translate-x-1/2 md:block">
                    <ArrowRight className="h-8 w-8 text-primary-200" />
                  </div>
                )}
                <div className="group relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-6 mx-auto">
                    <img src={step.imageSrc} alt={step.name} className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 text-center">
                    <span className="text-primary-600 mr-2">{step.id}.</span>
                    {step.name}
                  </h3>
                  <p className="mt-4 text-base text-gray-500 text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
