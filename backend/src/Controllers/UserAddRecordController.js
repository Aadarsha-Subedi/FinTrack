//DATABASE
import pool from '../db/db.js';

export default async function userAddRecordController(req, res) {

    const { email } = req.email;
    const { category, amount, description } = req.body;

    try {
        const response = await pool.query('INSERT INTO finances(category, amount, description, email) VALUES ($1, $2, $3, $4)', [category, amount, description, email]);
        return res.status(200).json({
            message: `Record added to ${email} successfully!`
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}