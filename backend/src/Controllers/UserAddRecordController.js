//DATABASE
import pool from '../db/db.js';

//THIRD PARTY IMPORTS
import validator from 'validator';

export default async function userAddRecordController(req, res) {

    const  email  = req.email;
    let { category, amount, description } = req.body;
    category = validator.trim(category);
    amount = validator.trim(amount);
    description = validator.trim(description);


    try {
        const response = await pool.query('INSERT INTO finances(category, amount, description, email) VALUES ($1, $2, $3, $4)', [category, amount, description, email]);
        return res.status(200).json({
            message: `Record added successfully!`
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}