//CORE REACT IMPORTS
import { useState } from 'react';

//THIRD PARTY IMPORTS
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

//ASSETS AND STYLES
import logoIcon from '../Public/logo.svg';
import logoutIcon from '../Public/logout.svg';
import crossIcon from '../Public/cross.svg';
import sidebarIcon from '../Public/sidebar.svg';
import '../Styles/Header.css';


export default function UserSidebar() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');

    async function logoutUser() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:8000/user/logout',
                withCredentials: true
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            navigate('../../login', { replace: true });
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
                <NavLink onClick={logoutUser} to='../../login' replace>
                    <button className='nav-logout-btn'>
                        <img src={logoutIcon} alt="A logout icon." width={24} />
                        Logout
                    </button>
                </NavLink>
            </div>
        </header>
    )

}