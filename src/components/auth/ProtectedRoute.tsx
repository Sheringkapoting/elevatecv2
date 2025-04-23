
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!user) {
      // Use useEffect to show toast to avoid React state updates during render
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      setShouldRedirect(true);
    }
  }, [user, toast]);

  if (shouldRedirect) {
    // Redirect to the homepage with a return URL
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  if (!user) {
    // Initial render without redirecting yet
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
