//DATABASE
import pool from '../db/db.js';

export default async function userController(req, res) {
    const email = req.email;
    const values = [email];
    const { category, order } = req.body;

    let queryString = 'SELECT * FROM finances WHERE email=$1';
    if (category !== 'all') {
        queryString += ' AND category=$2';
        values.push(category);
    }
    if (order) {
        if (order === 'date-descending') {
            queryString += ' ORDER BY timestamp DESC';
        } else if (order === 'date-ascending') {
            queryString += ' ORDER BY timestamp ASC';
        } else if (order === 'price-descending') {
            queryString += ' ORDER BY amount DESC';
        } else {
            queryString += ' ORDER BY amount ASC';
        }
    }
    try {
        const response = await pool.query(queryString, values);
        const name = await pool.query('SELECT name FROM users WHERE email=$1', [
            email,
        ]);
        return res.status(200).json({
            response: response,
            message: `Successfully fetched all data.`,
            name: name.rows[0].name,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
