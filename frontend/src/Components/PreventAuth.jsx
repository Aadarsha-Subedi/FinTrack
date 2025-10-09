//CORE REACT IMPORTS
import { useEffect, useState } from "react";

//THIRD PARTY IMPORTS
import { useNavigate } from "react-router-dom";
import axios from "axios";

//CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';

export default function PreventAuth({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${url}/verify`, {
                    withCredentials: true,
                });

                if (response.data.loggedIn) {
                    navigate("/user", { replace: true });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;

    return children;
}
