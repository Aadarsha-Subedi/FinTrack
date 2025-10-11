//DATABASE
import pool from '../db/db.js';

export default async function UpdateCurrecny(req, res) {

    const  email  = req.email;
    const { newCurrency } = req.body;


    try {
        const response = await pool.query('UPDATE users SET currency=$1 WHERE email=$2', [newCurrency, email]);
        return res.status(200).json({
            message: `Currency updated to ${newCurrency} successfully!`
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}