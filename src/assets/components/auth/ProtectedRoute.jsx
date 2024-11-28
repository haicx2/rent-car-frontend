import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [], useOutlet = false }) {
    const isAuthenticated = localStorage.getItem("authToken");
    const userRoles = JSON.parse(localStorage.getItem("userRoles")) || [];
    const location = useLocation();

    if (!isAuthenticated) {
        // Redirect to log in and remember the last location
        return <Navigate to='/login' state={{ from: location }} replace />;
    }


    const userRolesLower = userRoles.map((role) => role.toLowerCase());
    const allowedRolesLower = allowedRoles.map((role) => role.toLowerCase());

    const isAuthorized = userRolesLower.some((userRole) =>
        allowedRolesLower.includes(userRole)
    );


    if (isAuthorized) {
        // Optionally render children or an Outlet based on useOutlet flag
        return useOutlet ? <Outlet /> : children;
    } else {
        // Redirect to a default or unauthorized access page if the user doesn't have an allowed role
        return <Navigate to='/unauthorized' state={{ from: location }} replace />;
    }

}