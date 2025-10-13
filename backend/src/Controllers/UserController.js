//DATABASE
import pool from '../db/db.js';

export default async function userController (req, res) {

    const email = req.email;

    try {
        const response = await pool.query('SELECT * FROM finances WHERE email=$1 ORDER BY timestamp ASC', [email]);
        const name = await pool.query('SELECT name FROM users WHERE email=$1', [email]);
        return res.status(200).json({
            response: response,
            message: `Successfully fetched all data.`,
            name: name.rows[0].name
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}