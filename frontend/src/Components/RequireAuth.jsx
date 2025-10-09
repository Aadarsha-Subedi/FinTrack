//CORE IMPORTS
import { useEffect, useState, useContext } from "react";

//THIRD PARTY IMPORTS
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

//CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';
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

    if (isAuthenticated === null) return <p>Loading...</p>;

    return isAuthenticated ? children : null;
}
