import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./authStore";

export default function ProducerRoute({ children }) {
  const user = getCurrentUser();

  if (user?.role !== "PRODUCER") {
    return <Navigate to="/projects" replace />;
  }

  return children;
}