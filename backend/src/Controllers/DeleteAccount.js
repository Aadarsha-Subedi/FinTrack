////DATABASE
import pool from '../db/db.js';

export default async function DeleteAccount(req, res) {

    const { email } = req.email;

    try {
        const response = await pool.query('DELETE FROM users WHERE email=$1', [email]);
        res.clearCookie('accessToken');
        return res.status(200).json({
            message: 'Account deleted successfully!'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}