import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" />;

    try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
            localStorage.clear();
            return <Navigate to="/login" />;
        }
    } catch {
        return <Navigate to="/login" />;
    }

    return children;
}