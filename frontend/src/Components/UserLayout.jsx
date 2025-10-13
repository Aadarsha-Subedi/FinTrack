//CORE REACT IMPORTS
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

//CONTEXT, UTILS AND WEBHOOKS
import { CurrencyContext } from '../Contexts/CurrencyContext.js';
import { NameContext } from '../Contexts/NameContext.js';
import { url } from '../Utils/url.js';

//COMPONENTS
import Header from './Header.jsx';

//ASSETS AND STYLES
import '../Styles/UserLayout.css';

export default function UserLayout() {
    const [userCurrency, setUserCurrency] = useState(null);
    const [name, setName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${url}/user/settings`,
                    withCredentials: true,
                });
                setUserCurrency(response.data.message.rows[0].currency);
                setName(response.data.message.rows[0].name);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <CurrencyContext.Provider value={{ userCurrency, setUserCurrency }}>
            <NameContext.Provider value={{name, setName}}>
                <div className='user-content-container'>
                    <Header />
                    <main className='main-container'>
                        <Outlet />
                    </main>
                </div>
            </NameContext.Provider>
        </CurrencyContext.Provider>
    );
}
