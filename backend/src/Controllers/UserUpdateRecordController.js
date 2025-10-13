//DATABASE
import pool from '../db/db.js';

//THIRD PARTY IMPORTS
import validator from 'validator';

export default async function userUpdateRecordController(req, res) {

    const email = req.email;
    let { category, amount, description } = req.body;
    let { transactionId } = req.params;

    transactionId = validator.trim(transactionId);
    category = validator.trim(category);
    amount = validator.trim(amount);
    description = validator.trim(description);

    try {
        const response = await pool.query('UPDATE finances SET category=$1, amount=$2, description=$3 WHERE email=$4 AND "transactionId"=$5', [category, amount, description, email, transactionId]);
        if (!response.rowCount) {
            return res.status(404).json({
                message: 'Access denied.'
            });
        }
        return res.status(200).json({
            message: `Record successfully updated.`,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }

}