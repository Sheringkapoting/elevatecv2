
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  date: string;
}

interface JobApplicationsTableProps {
  jobApplications: JobApplication[];
  getStatusColor: (status: string) => string;
}

const JobApplicationsTable = ({ jobApplications, getStatusColor }: JobApplicationsTableProps) => {
  return (
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
  );
};

export default JobApplicationsTable;
