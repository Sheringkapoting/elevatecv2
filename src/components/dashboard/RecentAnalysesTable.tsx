
import { Link } from "react-router-dom";
import { ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

interface RecentAnalysesTableProps {
  recentAnalyses: any[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  getResumeFileName: (filePath: string) => string;
  formatDate: (dateString: string) => string;
  getElapsedTime: (dateString: string) => string;
}

const RecentAnalysesTable = ({
  recentAnalyses,
  isLoading,
  currentPage,
  totalPages,
  handlePageChange,
  getResumeFileName,
  formatDate,
  getElapsedTime
}: RecentAnalysesTableProps) => {
  return (
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
                <TableRow key={analysis.id}>
                  <TableCell className="text-left">
                    <div className="font-medium text-gray-900">{formatDate(analysis.created_at)}</div>
                    <div className="text-xs text-gray-500">{getElapsedTime(analysis.created_at)}</div>
                  </TableCell>
                  <TableCell className="font-medium text-left">
                    {getResumeFileName(analysis.resume_file_path)}
                  </TableCell>
                  <TableCell className="max-w-xs text-left">
                    <div className="text-sm text-gray-900 truncate">
                      {analysis.job_description?.substring(0, 100)}
                      {analysis.job_description?.length > 100 ? "..." : ""}
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
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
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="py-4 border-t border-gray-200">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => handlePageChange(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAnalysesTable;
