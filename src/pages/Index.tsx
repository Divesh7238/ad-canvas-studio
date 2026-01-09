import { Navigate } from "react-router-dom";

// Redirect to Dashboard - Index is handled by Dashboard
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
