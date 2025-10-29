//CORE REACT IMPORTS
import { useState, useContext } from 'react';

//THIRD PARTY IMPORTS
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';


// CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';
import { AuthContext } from '../Contexts/AuthContext';

//ASSETS AND STYLES
import logoutIcon from '../Public/logout.svg';
import '../Styles/Header.css';




export default function UserSidebar() {

    const { setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    async function logoutUser() {
        try {
            const response = await axios({
                method: 'GET',
                url: `${url}/user/logout`,
                withCredentials: true
            });
            toast.success(response.data.message);
            setIsAuthenticated(false);
            navigate('/login', { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    }

    function updateActiveTab(tab) {
        if (activeTab !== null) {
            const currentActiveTab = document.querySelector(`.${activeTab}`);
            currentActiveTab.classList.remove('active');
        }
        setActiveTab(tab);
        const newActiveTab = document.querySelector(`.${tab}`);
        newActiveTab.classList.add('active');
    }

    return (
        <header className="header-container">
            <div className="header-logo-wrapper">
                <NavLink to='/user' replace>
                    <h1 className="header__title">Fin<span>Track</span></h1>
                </NavLink>
            </div>
            <div className="header-nav-links">
                <NavLink
                    to="/user"
                    className={({ isActive }) => `nav-links-text dashboard ${isActive ? 'active' : ''}`}
                    end
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="./analytics"
                    className={({ isActive }) => `nav-links-text analytics ${isActive ? 'active' : ''}`}
                >
                    Analytics
                </NavLink>

                <NavLink
                    to="./settings"
                    className={({ isActive }) => `nav-links-text settings ${isActive ? 'active' : ''}`}
                >
                    Settings
                </NavLink>
            </div>
            <div className="nav-logout-wrapper">
                <div>
                    <button onClick={logoutUser} className='nav-logout-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000"><g fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M14 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" /><path d="M9 12h12l-3-3m0 6l3-3" /></g></svg>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )

}