//CORE REACT IMPORTS
import { useState } from 'react';

//THIRD PARTY IMPORTS
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';


// CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';

//ASSETS AND STYLES
import logoutIcon from '../Public/logout.svg';
import '../Styles/Header.css';


export default function UserSidebar() {

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
                    <h1 className='header-logo'>FinTrack</h1>
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
                <div onClick={logoutUser}>
                    <button className='nav-logout-btn'>
                        <img src={logoutIcon} alt="A logout icon." width={24} />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )

}