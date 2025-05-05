
import { BarChart2, FileText, Briefcase, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  averageAtsScore: number;
  totalCount: number;
  recentAnalyses: any[];
  isLoading: boolean;
}

const StatsCards = ({ averageAtsScore, totalCount, recentAnalyses, isLoading }: StatsCardsProps) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Average ATS Score</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {isLoading ? "..." : `${averageAtsScore}%`}
              </h3>
              {totalCount > 1 && (
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Based on {totalCount} analyses</span>
                </p>
              )}
              {totalCount === 1 && (
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>Based on 1 analysis</span>
                </p>
              )}
              {totalCount === 0 && !isLoading && (
                <p className="text-sm text-gray-500 mt-1">
                  No data available
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
                {isLoading ? "..." : totalCount}
              </h3>
              {recentAnalyses.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <span>Last analysis: {getElapsedTime(recentAnalyses[0]?.created_at)}</span>
                </p>
              )}
              {recentAnalyses.length === 0 && !isLoading && (
                <p className="text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 inline mr-1" />
                  <span>No analyses yet</span>
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
  );
};

export default StatsCards;
