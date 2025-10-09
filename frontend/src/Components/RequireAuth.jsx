//CORE IMPORTS
import { useEffect, useState } from "react";

//THIRD PARTY IMPORTS
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export default function RequireAuth({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("http://localhost:8000/verify", {
                    withCredentials: true,
                });

                if (response.data.loggedIn) {
                    setLoading(false);
                } else {
                    toast.error("Please login first");
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                toast.error("Session expired or invalid");
                navigate("/login", { replace: true });
            }
        };

        verifyUser();
    }, [navigate]);

    if (loading) return <p>Loading...</p>;

    return children;
}
