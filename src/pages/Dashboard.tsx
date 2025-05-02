
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart2, FileText, TrendingUp, Clock, CheckCircle, 
  Eye, Download, ExternalLink, ChevronRight, Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

const Dashboard = () => {
  const { user } = useAuth();
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [averageAtsScore, setAverageAtsScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResumeAnalyses = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("resume_analysis")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setRecentAnalyses(data);
          
          // Calculate average ATS score
          const totalScore = data.reduce((sum, analysis) => sum + (analysis.ats_score || 0), 0);
          setAverageAtsScore(Math.round(totalScore / data.length));
        }
      } catch (error) {
        console.error("Error fetching resume analyses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeAnalyses();
  }, [user]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Helper function to get elapsed time text
  const getElapsedTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

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

  // Function to extract filename from path
  const getResumeFileName = (filePath: string) => {
    if (!filePath) return "Untitled Resume";
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    // Remove any UUID or timestamp from the filename
    return fileName.replace(/^[0-9a-f-]+-/, '').replace(/\.[^/.]+$/, '');
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
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                      {isLoading ? "..." : `${averageAtsScore}%`}
                    </h3>
                    {recentAnalyses.length > 1 && (
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>Based on {recentAnalyses.length} analyses</span>
                      </p>
                    )}
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
                    <p className="text-sm font-medium text-gray-500">Total Analyses</p>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                      {isLoading ? "..." : recentAnalyses.length}
                    </h3>
                    {recentAnalyses.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 inline mr-1" />
                        <span>Last analysis: {getElapsedTime(recentAnalyses[0]?.created_at)}</span>
                      </p>
                    )}
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
          
          {/* Recent Resume Analyses */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Resume Analyses</h2>
              <Link to="/analyze" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                New Analysis
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[180px] text-left">Date</TableHead>
                    <TableHead className="w-[200px] text-left">Name</TableHead>
                    <TableHead className="text-left">Job Description</TableHead>
                    <TableHead className="w-[120px] text-left">ATS Score</TableHead>
                    <TableHead className="w-[100px] text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">Loading recent analyses...</TableCell>
                    </TableRow>
                  ) : recentAnalyses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No resume analyses found. <Link to="/analyze" className="text-primary-600 hover:underline">Analyze your first resume</Link>
                      </TableCell>
                    </TableRow>
                  ) : (
                    recentAnalyses.map((analysis) => (
                      <TableRow key={analysis.id} className="text-left">
                        <TableCell>
                          <div className="font-medium text-gray-900">{formatDate(analysis.created_at)}</div>
                          <div className="text-xs text-gray-500">{getElapsedTime(analysis.created_at)}</div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {getResumeFileName(analysis.getResumeFileName())}
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-gray-900 truncate">
                            {analysis.job_description?.substring(0, 100)}
                            {analysis.job_description?.length > 100 ? "..." : ""}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${analysis.ats_score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{analysis.ats_score}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-left">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              window.open(`/analyze?id=${analysis.id}`, '_blank');
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[200px] text-left">Company</TableHead>
                    <TableHead className="w-[250px] text-left">Position</TableHead>
                    <TableHead className="w-[120px] text-left">Status</TableHead>
                    <TableHead className="w-[150px] text-left">Date</TableHead>
                    <TableHead className="w-[100px] text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.map((job) => (
                    <TableRow key={job.id} className="text-left">
                      <TableCell className="font-medium">{job.company}</TableCell>
                      <TableCell>{job.position}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            job.status
                          )}`}
                        >
                          {job.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {job.date}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

