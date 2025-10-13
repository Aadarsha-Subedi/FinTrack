//CORE IMPORTS
import { useEffect, useContext } from "react";

//COMPONENTS
import Loader from './Loader.jsx';

//THIRD PARTY IMPORTS
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

//CONTEXTS, UTILS AND WEBHOOKS
import { AuthContext } from "../Contexts/AuthContext";


export default function RequireAuth({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            toast.error("Please login first");
            navigate("/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) return <Loader />;

    return isAuthenticated ? children : null;
}
