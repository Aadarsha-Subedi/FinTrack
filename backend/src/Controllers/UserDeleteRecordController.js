//DATABASE
import pool from '../db/db.js';

export default async function userDeleteRecordController (req, res) {

    const email = req.email;
    const {transactionId} = req.params;

    try {
        const response = await pool.query('DELETE FROM finances WHERE email=$1 AND "transactionId"=$2', [email, transactionId]);
        if(!response.rowCount) {
            return res.status(404).json({
                message: 'Access denied'
            });
        }
        return res.status(200).json({
            message: `Record removed successfully from ${email}`,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}