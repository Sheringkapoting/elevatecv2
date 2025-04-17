
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
            <div>
              <div className="inline-flex items-center rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 mb-4">
                <span>New AI Features</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Elevate Your Resume with <span className="text-primary-600">AI Analysis</span>
              </h1>
              <p className="mt-6 text-base text-gray-500 sm:text-xl lg:text-lg xl:text-xl">
                Upload your resume, get instant ATS compatibility scores, and receive tailored improvements based on job descriptions. Build professional resumes that get through ATS systems and into hiring managers' hands.
              </p>
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
                <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                  <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-6 text-base">
                    <Link to="/analyze">
                      Analyze Resume
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-6 text-base">
                    <Link to="/builder">
                      Build Resume
                    </Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  No credit card required. Start improving your resume in minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0 px-4 sm:px-6 lg:px-0">
            <div className="bg-white sm:mx-auto sm:w-full sm:overflow-hidden rounded-xl border border-gray-200 shadow-xl">
              <div className="relative mx-auto h-[520px] w-full rounded-xl bg-primary-50 overflow-hidden">
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between bg-white rounded-lg py-2 px-4 shadow-sm border border-gray-200">
                  <div className="flex space-x-2 items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500">Resume Analysis</div>
                  <div></div>
                </div>
                <div className="absolute top-16 left-4 right-4 bottom-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <div className="font-medium text-lg text-gray-900">Resume Score</div>
                      <div className="text-sm text-gray-500">Analyzed 2 minutes ago</div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-600">82%</span>
                        </div>
                        <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#E0EFFF" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#147EFB"
                            strokeWidth="10"
                            strokeDasharray="283"
                            strokeDashoffset="51"
                          />
                        </svg>
                      </div>
                      <div className="ml-6">
                        <h4 className="text-lg font-medium text-gray-900">Good ATS Compatibility</h4>
                        <p className="text-sm text-gray-500">
                          Your resume is well-structured for ATS systems, but has a few areas for improvement.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium text-gray-700">Keyword Matching</div>
                          <div className="text-sm font-medium text-primary-600">78%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium text-gray-700">Formatting</div>
                          <div className="text-sm font-medium text-primary-600">95%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium text-gray-700">Content Quality</div>
                          <div className="text-sm font-medium text-primary-600">85%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium text-gray-700">Skills Match</div>
                          <div className="text-sm font-medium text-primary-600">70%</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
