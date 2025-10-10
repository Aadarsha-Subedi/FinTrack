//THIRD PARTY IMPORTS
import pool from '../db/db.js';

export default async function userAnalyticsController(req, res) {

    const  email  = req.email;
    const year = new Date().getFullYear();
    const month = new Date().getMonth()+1;

    try {
        const barMonthlyFinances = await pool.query('SELECT EXTRACT(MONTH FROM timestamp) AS month, SUM(amount) AS total FROM finances WHERE EXTRACT(YEAR FROM timestamp)=$1 AND email=$2 GROUP BY month ORDER BY month;', [year, email]);
        const pieMonthlyFinances = await pool.query('SELECT category, SUM(amount) AS total FROM finances WHERE EXTRACT(YEAR FROM timestamp)=$1 AND email=$2 GROUP BY category ORDER BY category;', [year, email]);
        const totalDaily = await pool.query('SELECT SUM(amount) as "totalDaily" FROM finances WHERE timestamp >= CURRENT_DATE AND email=$1', [email]);
        const totalMonthly = await pool.query('SELECT SUM(amount) AS "totalMonthly" FROM finances WHERE EXTRACT(MONTH FROM timestamp)=$1 AND EXTRACT(YEAR FROM timestamp)=$2 AND email=$3;', [month, year, email]);
        const totalYearly = await pool.query('SELECT SUM(amount) AS "totalYearly" FROM finances WHERE EXTRACT(YEAR FROM timestamp)=$1 AND email=$2;', [year, email]);
        const currency = await pool.query('SELECT currency FROM users WHERE email=$1', [email]);
        return res.status(200).json({
            barMonthlyFinances: barMonthlyFinances,
            pieMonthlyFinances: pieMonthlyFinances,
            totalDaily: totalDaily,
            totalMonthly: totalMonthly,
            totalYearly: totalYearly,
            currency: currency
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }


}