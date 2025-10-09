//CORE REACT IMPORTS
import { useEffect, useContext } from "react";

//THIRD PARTY IMPORTS
import { useNavigate } from "react-router-dom";
import axios from "axios";

//CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';
import { AuthContext } from "../Contexts/AuthContext.jsx";


export default function PreventAuth({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/user", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) return <p>Loading...</p>;

    return !isAuthenticated ? children : null;
}
