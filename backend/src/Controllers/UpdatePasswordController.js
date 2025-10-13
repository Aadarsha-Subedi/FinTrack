//DATABASE
import pool from '../db/db.js';

//THIRD PARTY IMPORTS
import validator from 'validator';
import bcrypt from 'bcryptjs';

export default async function updatePasswordController(req, res) {

    const email = req.email;
    let { currentPassword, newPassword, confirmNewPassword } = req.body;
    currentPassword = validator.trim(currentPassword)
    newPassword = validator.trim(newPassword)
    confirmNewPassword = validator.trim(confirmNewPassword)

    if (!validator.isStrongPassword(currentPassword)) {
        return res.status(500).json({
            message: 'Invalid credentials.'
        })
    }
    if (!validator.isStrongPassword(newPassword) || !validator.isStrongPassword(confirmNewPassword)) {
        return res.status(500).json({
            message: 'Password must have 1 number, special character, uppercase and lowercase letter and a minimum length of 8.'
        })
    }
    if (newPassword !== confirmNewPassword) {
        return res.status(500).json({
            message: 'Passwords do not match.'
        });
    }



    try {
        const password = await pool.query('SELECT "hashedPassword" from users WHERE email=$1', [email]);
        const correctPassword = await bcrypt.compare(currentPassword, password.rows[0].hashedPassword);
        if (!correctPassword) {
            return res.status(500).json({
                message: 'Invalid credentials.'
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const response = await pool.query('UPDATE users SET "hashedPassword"=$1 WHERE email=$2', [hashedPassword, email]);
        return res.status(200).json({
            message: 'Password updated successfully!'
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}