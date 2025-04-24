
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute check - Loading:", loading, "User:", !!user);
    
    // Only show toast and redirect if not loading and no user
    if (!loading && !user) {
      console.log("Not logged in, showing auth required message");
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      setShouldRedirect(true);
    }
  }, [user, toast, loading]);

  // During initial load, show nothing
  if (loading) {
    console.log("Auth loading, returning null");
    return null;
  }

  // If authenticated, show the protected content
  if (user) {
    console.log("User authenticated, showing protected content");
    return <>{children}</>;
  }

  // If we confirmed there's no user and not in loading state, redirect
  if (shouldRedirect) {
    console.log("Redirecting to home from:", location.pathname);
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  // Default case: show nothing while determining auth state
  return null;
};

export default ProtectedRoute;
