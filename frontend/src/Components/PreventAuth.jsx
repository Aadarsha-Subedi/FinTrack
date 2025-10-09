import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PreventAuth({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:8000/verify", {
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
