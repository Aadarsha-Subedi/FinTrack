//DATABASE
import pool from '../db/db.js';

//THIRD PARTY IMPORTS
import validator from 'validator';

export default async function ChangeNameController (req, res) {

    const email = req.email;
    let {newName} = req.body;
    newName = validator.trim(newName);

    try {
        const response = await pool.query('UPDATE users SET name=$1 WHERE email=$2', [newName, email]);
        res.status(200).json({
            message: `Name changed successfully!`
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}