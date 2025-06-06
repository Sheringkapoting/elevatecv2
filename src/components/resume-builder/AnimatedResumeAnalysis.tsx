
import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Search, Zap } from 'lucide-react';

const AnimatedResumeAnalysis = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const steps = [
    { icon: FileText, text: "Analyzing resume structure", color: "text-blue-500" },
    { icon: Search, text: "Extracting key information", color: "text-purple-500" },
    { icon: Zap, text: "Optimizing for ATS", color: "text-orange-500" },
    { icon: CheckCircle, text: "Ready to enhance", color: "text-green-500" }
  ];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnimating, steps.length]);

  return (
    <div className="relative mx-auto w-32 h-32 mb-6">
      {/* Outer animated ring */}
      <div className="absolute inset-0 rounded-full border-4 border-gray-200">
        <div 
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"
          style={{ animationDuration: '3s' }}
        />
      </div>
      
      {/* Inner content area */}
      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-lg">
        {/* Animated icon */}
        <div className="relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  currentStep === index
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                }`}
              >
                <IconComponent 
                  className={`w-8 h-8 ${step.color} transition-colors duration-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Floating progress indicators */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Animated pulse rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-full border border-primary-200 animate-ping"
          style={{ animationDuration: '2s' }}
        />
        <div 
          className="absolute inset-2 rounded-full border border-primary-300 animate-ping"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        />
      </div>
    </div>
  );
};

export default AnimatedResumeAnalysis;
