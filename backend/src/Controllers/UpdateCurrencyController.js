//DATABASE
import pool from '../db/db.js';

//THIRD PARTY IMPORTS
import validator from 'validator';

export default async function UpdateCurrecnyController(req, res) {

    const  email  = req.email;
    let { newCurrency } = req.body;
    newCurrency = validator.trim(newCurrency);


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