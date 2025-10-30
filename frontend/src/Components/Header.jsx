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
import dashboardIcon from '../Assets/dashboard.svg';
import analyticsIcon from '../Assets/analytics.svg';
import settingsIcon from '../Assets/settings.svg';
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
                    className={({ isActive }) => `navlinks__container nav-links-text dashboard ${isActive ? 'active' : ''}`}
                    end
                >
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932m0 10.75h-3.875a1.942 1.942 0 0 0-1.942 1.933v3.875a1.942 1.942 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942v-3.875a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942" /></svg>
                    Dashboard
                </NavLink>

                <NavLink
                    to="./analytics"
                    className={({ isActive }) => `navlinks__container nav-links-text analytics ${isActive ? 'active' : ''}`}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="M6.209 12.324H4.401c-.579 0-1.048.47-1.048 1.048v6.83c0 .578.47 1.048 1.048 1.048H6.21c.58 0 1.049-.47 1.049-1.049v-6.829a1.05 1.05 0 0 0-1.049-1.049m6.694-9.573h-1.808c-.58 0-1.049.47-1.049 1.049V20.2c0 .58.47 1.049 1.05 1.049h1.807c.58 0 1.049-.47 1.049-1.049V3.8c0-.58-.47-1.049-1.05-1.049m6.696 5.176H17.79c-.58 0-1.049.47-1.049 1.05V20.2c0 .58.47 1.049 1.049 1.049h1.808a1.05 1.05 0 0 0 1.049-1.049V8.976c0-.58-.47-1.049-1.05-1.049" /></svg>
                    Analytics
                </NavLink>

                <NavLink
                    to="./settings"
                    className={({ isActive }) => `navlinks__container nav-links-text settings ${isActive ? 'active' : ''}`}
                >
                    <svg width="16" height="16" viewBox="0 0 1024 1024"><path fill="currentColor" d="m960.496 415.056l-82.129-18.224c-6.4-20.48-14.784-40.08-24.4-58.927l44.431-74.032c16.592-26.512 24.976-65.52 0-90.512l-45.28-45.248c-24.976-24.992-67.151-20.496-92.623-2.832l-72.032 45.887c-18.689-9.696-38.225-18-58.529-24.56l-18.431-83.12C605.999 33.009 579.343 0 543.999 0h-64c-35.344 0-57.008 33.504-64 64l-20.528 82.128c-21.68 6.912-42.496 15.744-62.336 26.208l-73.84-47.024c-25.456-17.664-67.648-22.16-92.624 2.832l-45.264 45.248c-24.992 25.008-16.608 64 0 90.512l46.752 77.92c-8.767 17.664-16.544 35.936-22.544 55.024l-82.112 18.224C33.007 420.56 0 447.216 0 482.56v64c0 35.344 33.504 57.008 64 64l83.152 20.784c5.745 17.632 12.928 34.56 21.056 50.976l-46.8 78c-16.591 26.496-24.975 65.504 0 90.496l45.28 45.248c24.976 25.008 67.152 20.496 92.624 2.847l74-47.152c19.952 10.528 40.88 19.44 62.704 26.337L416.495 960c7.008 30.496 28.656 64 64 64h64c35.344 0 62-33.007 67.504-63.504l18.464-83.343c20.096-6.496 39.376-14.689 57.84-24.257l72.192 46c25.472 17.664 67.664 22.16 92.624-2.848L898.4 850.8c24.976-25.008 16.592-64 0-90.496l-44.463-74.128c8.944-17.568 16.688-35.84 22.912-54.848L960 610.56c30.496-7.008 64-28.656 64-64v-64c0-35.344-32.992-62-63.504-67.504zm-.465 126.992c-2.72 1.952-7.842 4.635-14.338 6.139l-118.656 29.631l-11.008 33.632c-4.975 15.153-11.407 30.529-19.119 45.712l-16.064 31.569l62.688 104.528c4 6.4 5.872 12.127 6.432 15.503l-42.096 42.033c-4.064-1.28-8.688-2.945-10.912-4.464l-105.344-67.184l-32.752 16.945c-15.776 8.192-31.969 14.976-48.097 20.192l-34.88 11.28l-26.368 119.12c-1.216 6.368-4.624 11.504-6.96 13.344h-57.6c-1.951-2.72-4.623-7.84-6.112-14.32L449.39 827.9l-34.095-10.817c-17.569-5.536-35.088-12.912-52.144-21.904l-32.912-17.376l-105.36 67.152c-4.304 2.912-8.912 4.56-13.088 4.56l-41.968-40.847c.56-3.311 2.304-8.783 5.792-14.367l65.456-109.056l-15.568-31.344c-7.264-14.784-13.024-28.656-17.504-42.4l-10.992-33.664L79.518 548.46c-7.392-1.68-12.736-4.432-15.52-6.4v-59.504a.32.32 0 0 0 .145.032c1.072 0 6.336-3.745 10.72-4.544l120.72-26.737l11.087-35.28c4.512-14.368 10.672-29.344 18.816-45.775l15.568-31.36l-64.767-107.92c-4.016-6.432-5.872-12.16-6.432-15.52l42.08-42.065c4.08 1.312 8.672 2.96 10.88 4.48l107.312 68.4l32.88-17.344c16.88-8.895 34.336-16.239 51.904-21.823l34.016-10.832L478.11 79.501c1.697-7.391 4.416-12.735 6.4-15.52H544c-.433.657 3.68 6.24 4.527 10.865l26.88 121.408l34.848 11.264c16.336 5.28 32.752 12.16 48.72 20.448l32.752 17.008l103.152-65.712c4.32-2.945 8.944-4.576 13.088-4.576l42 40.816c-.56 3.328-2.32 8.816-5.808 14.416l-63.344 105.488l16.16 31.616c8.72 17.056 15.376 33.056 20.32 48.928l11.056 35.344L946.64 477.55c7.153 1.328 12.721 5.456 13.905 7.696zM512.43 319.674c-106.272 0-192.736 86.288-192.736 192.32c0 106.016 86.464 192.304 192.736 192.304s192.736-86.288 192.736-192.304c0-106.032-86.464-192.32-192.736-192.32zm-.432 320.32c-70.576 0-128-57.424-128-128c0-70.592 57.424-128 128-128c70.592 0 128 57.408 128 128c0 70.576-57.424 128-128 128z" /></svg>
                    Settings
                </NavLink>
            </div>
            <div className="nav-logout-wrapper">
                <div>
                    <button onClick={logoutUser} className='nav-logout-btn'>
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8v-1Z" /></svg>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )

}