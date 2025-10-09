//DATABASE
import pool from '../db/db.js';

export default async function userUpdateRecordController(req, res) {

    const { email } = req.email;
    const { category, amount, description } = req.body;
    const { transactionId } = req.params;

    try {
        const response = await pool.query('UPDATE finances SET category=$1, amount=$2, description=$3 WHERE email=$4 AND "transactionId"=$5', [category, amount, description, email, transactionId]);
        if(!response.rowCount) {
            return res.status(404).json({
                message: 'Access denied.'
            });
        }
        return res.status(200).json({
            message: `Record successfully updated in ${email}`,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }

}