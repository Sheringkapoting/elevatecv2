
import NavbarContainer from "@/components/layout/NavbarContainer";
import Footer from "@/components/layout/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentAnalysesTable from "@/components/dashboard/RecentAnalysesTable";
import JobApplicationsTable from "@/components/dashboard/JobApplicationsTable";
import { useDashboardData } from "@/hooks/useDashboardData";

const Dashboard = () => {
  const {
    recentAnalyses,
    averageAtsScore,
    isLoading,
    currentPage,
    totalPages,
    handlePageChange,
    formatDate,
    getElapsedTime,
    getResumeFileName,
    getStatusColor,
    jobApplications,
  } = useDashboardData();

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarContainer />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <DashboardHeader />
          
          {/* Stats Cards */}
          <StatsCards 
            averageAtsScore={averageAtsScore}
            totalCount={recentAnalyses.length}
            recentAnalyses={recentAnalyses}
            isLoading={isLoading}
          />
          
          {/* Recent Resume Analyses */}
          <RecentAnalysesTable
            recentAnalyses={recentAnalyses}
            isLoading={isLoading}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            getResumeFileName={getResumeFileName}
            formatDate={formatDate}
            getElapsedTime={getElapsedTime}
          />

          {/* Job Applications */}
          <JobApplicationsTable 
            jobApplications={jobApplications}
            getStatusColor={getStatusColor}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
