import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const useDashboardData = () => {
  const { user } = useAuth();
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [averageAtsScore, setAverageAtsScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  useEffect(() => {
    const fetchResumeAnalyses = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        
        // First, get the total count of analyses for pagination and display
        const { count, error: countError } = await supabase
          .from("resume_analysis")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);
        
        if (countError) throw countError;
        
        // Update total count - if null, set to 0
        setTotalCount(count || 0);
        
        // Then fetch the paginated analyses if there are any
        if (count && count > 0) {
          // Calculate average ATS score from ALL records (not just current page)
          const { data: allData, error: avgError } = await supabase
            .from("resume_analysis")
            .select("ats_score")
            .eq("user_id", user.id);
          
          if (avgError) throw avgError;
          
          if (allData && allData.length > 0) {
            const totalScore = allData.reduce((sum, analysis) => sum + (analysis.ats_score || 0), 0);
            setAverageAtsScore(Math.round(totalScore / allData.length));
          } else {
            setAverageAtsScore(0);
          }

          // Fetch paginated data for display in the table
          const from = (currentPage - 1) * itemsPerPage;
          const to = from + itemsPerPage - 1;
          
          const { data, error } = await supabase
            .from("resume_analysis")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .range(from, to);
            
          if (error) throw error;
          
          setRecentAnalyses(data || []);
        } else {
          // No data available
          setRecentAnalyses([]);
          setAverageAtsScore(0);
        }
      } catch (error) {
        console.error("Error fetching resume analyses:", error);
        setRecentAnalyses([]);
        setAverageAtsScore(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResumeAnalyses();
  }, [user, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  // Function to extract filename from path
  const getResumeFileName = (filePath: string) => {
    if (!filePath) return "Untitled Resume";
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    // Remove any UUID or timestamp from the filename
    return fileName.replace(/^[0-9a-f-]+-/, '').replace(/\.[^/.]+$/, '');
  };

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

  return {
    recentAnalyses,
    averageAtsScore,
    isLoading,
    currentPage,
    totalCount,
    totalPages,
    handlePageChange,
    formatDate,
    getElapsedTime,
    getResumeFileName,
    getStatusColor,
    jobApplications,
  };
};
