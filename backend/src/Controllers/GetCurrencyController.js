////DATABASE
import pool from '../db/db.js';

export default async function GetCurrencyController(req, res) {

    const email = req.email;

    try {
        const response = await pool.query('SELECT currency, name FROM users WHERE email=$1', [email]);
        return res.status(200).json({
            message: response
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}