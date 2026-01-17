import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();


   
    if (loading) {
        return <div>Loading...</div>; 
    }

   
    if (!isAuthenticated) {
        console.log('isAuthenticated',isAuthenticated);
        
       
        return <Navigate to="/login" replace />;
    }


    return children;
};

export default ProtectedRoutes;