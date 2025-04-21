
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart2, FileText, TrendingUp, Clock, CheckCircle, 
  Eye, Download, ExternalLink, ChevronRight, Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data for recent resumes
  const recentResumes = [
    {
      id: 1,
      name: "Software Developer - Google",
      lastUpdated: "2 days ago",
      atsScore: 86,
      views: 12,
      downloads: 3,
    },
    {
      id: 2,
      name: "Frontend Developer - Microsoft",
      lastUpdated: "1 week ago",
      atsScore: 78,
      views: 8,
      downloads: 1,
    },
    {
      id: 3,
      name: "Full Stack Developer - Amazon",
      lastUpdated: "2 weeks ago",
      atsScore: 92,
      views: 15,
      downloads: 4,
    },
  ];

  // Mock data for job applications
  const jobApplications = [
    {
      id: 1,
      company: "Google",
      position: "Software Developer",
      status: "Applied",
      date: "May 15, 2023",
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Frontend Developer",
      status: "Interview",
      date: "May 10, 2023",
    },
    {
      id: 3,
      company: "Amazon",
      position: "Full Stack Developer",
      status: "Rejected",
      date: "Apr 28, 2023",
    },
    {
      id: 4,
      company: "Apple",
      position: "iOS Developer",
      status: "Offered",
      date: "Apr 20, 2023",
    },
  ];

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Interview":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Offered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarContainer />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-lg text-gray-500">
                Track your resume performance and job applications
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button asChild variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                <Link to="/analyze">
                  Analyze Resume
                </Link>
              </Button>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
                <Link to="/builder">
                  Create New Resume
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average ATS Score</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">85%</h3>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+12% from last month</span>
                    </p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <BarChart2 className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Resumes</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">7</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 inline mr-1" />
                      <span>Last update: 2 days ago</span>
                    </p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Applied Jobs</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">12</h3>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>2 interviews scheduled</span>
                    </p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Resumes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Resumes</h2>
              <Link to="/builder" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50 px-6 py-3">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resume Name
                    </div>
                    <div className="col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </div>
                    <div className="col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ATS Score
                    </div>
                    <div className="col-span-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </div>
                    <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </div>
                  </div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                  {recentResumes.map((resume) => (
                    <div key={resume.id} className="px-6 py-4">
                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                              <FileText className="h-5 w-5 text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{resume.name}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-sm text-gray-500">
                          {resume.lastUpdated}
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${resume.atsScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{resume.atsScore}%</span>
                          </div>
                        </div>
                        <div className="col-span-1 text-center flex items-center justify-center text-sm text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          {resume.views}
                        </div>
                        <div className="col-span-2 text-right space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Applications */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Job Applications</h2>
              <Button variant="outline" className="text-sm">
                Add Application
              </Button>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50 px-6 py-3">
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </div>
                    <div className="col-span-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </div>
                    <div className="col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </div>
                    <div className="col-span-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </div>
                    <div className="col-span-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </div>
                  </div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                  {jobApplications.map((job) => (
                    <div key={job.id} className="px-6 py-4">
                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-3">
                          <div className="text-sm font-medium text-gray-900">{job.company}</div>
                        </div>
                        <div className="col-span-3">
                          <div className="text-sm text-gray-900">{job.position}</div>
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <div className="col-span-2 text-sm text-gray-500">
                          {job.date}
                        </div>
                        <div className="col-span-2 text-right space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
