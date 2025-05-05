
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;
