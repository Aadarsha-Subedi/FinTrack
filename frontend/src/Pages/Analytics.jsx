//CORE REACT IMPORTS
import { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';

//CONTEXTS, UTILS AND HOOKS
import { CurrencyContext } from '../Contexts/CurrencyContext.js';
import { url } from '../Utils/url.js';

//COMPONENTS
import MonthlyBarChart from '../Components/MonthlyBarChart.jsx';
import MonthlyPieChart from '../Components/MonthlyPieChart.jsx';

//THIRD PARTY IMPORTS
import axios from 'axios';
import { toast } from 'sonner';
import monthMap from '../Utils/Months.js';

//ASSETS AND STYLES
import '../Styles/Analytics.css';


export default function Analytics() {

    const [barMonthlyApiData, setBarMonthlyApiData] = useState([]);
    const [pieMonthlyApiData, setPieMonthlyApiData] = useState([]);
    const [totalDaily, setTotalDaily] = useState(null);
    const [totalMonthly, setTotalMonthly] = useState(null);
    const [totalYearly, setTotalYearly] = useState(null);
    const [currency, setCurrency] = useState(null);
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const userCurrency = useContext(CurrencyContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${url}/user/analytics`,
                    withCredentials: true,
                });
                if (response.status !== 200) {
                    toast.error(response.data.message);
                    return;
                }
                setBarMonthlyApiData(response.data.barMonthlyFinances.rows);
                setPieMonthlyApiData(response.data.pieMonthlyFinances.rows);
                setTotalMonthly(response.data.totalMonthly.rows[0].totalMonthly);
                setTotalYearly(response.data.totalYearly.rows[0].totalYearly);
                setTotalDaily(response.data.totalDaily.rows[0].totalDaily);
                const tempCurrency = response.data.currency.rows[0].currency;
                const formattedCurrency = tempCurrency.slice(tempCurrency.indexOf('(') + 1, tempCurrency.indexOf(')'));
                setCurrency(formattedCurrency);
            } catch (error) {
                toast.error(error.message);
            }
        }
        fetchData();
    }, [])

    const variants = {
        initial: {
            opacity: 0,
            scale: 0
        },
        animate: {
            opacity: 1,
            scale: 1
        }
    }

    return (
        <motion.div variants={variants} initial={'initial'} animate={'animate'} transition={{ duration: 0.5, delay: 0.2 }} className="analytics-info-container">
            <div className="info-container">
                <div className="info-daily-analytics-container">
                    <h1 className='hero-amount'>{currency}{totalDaily ?? 0}</h1>
                    <p className='hero-info'>Total amount spent today</p>
                </div>
                <div className="info-monthly-analytics-container">
                    <h1 className='hero-amount'>{currency}{totalMonthly ?? 0}</h1>
                    <p className='hero-info'>Total amount spent in {monthMap[month]}</p>
                </div>
                <div className="info-yearly-analytics-container">
                    <h1 className='hero-amount'>{currency}{totalYearly ?? 0}</h1>
                    <p className='hero-info'>Total amount spent in {year}</p>
                </div>
            </div>
            <div className="analytics-container">
                <div className="bar-analytics-container">
                    <MonthlyBarChart apiData={barMonthlyApiData} year={2025} />
                </div>
                <div className="pie-analytics-container">
                    <MonthlyPieChart apiData={pieMonthlyApiData} year={2025} />
                </div>
            </div>
        </motion.div>
    )
}