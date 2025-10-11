//THIRD PARTY IMPORTS
import validator from 'validator';
import bcrypt from 'bcryptjs';

//UTILS
import { Records } from '../Utils/Records.js';

//DATABASE
import pool from '../db/db.js';

export default async function signupController(req, res) {

    let { email, password, confirmPassword, currency, name } = req.body;
    email = validator.trim(email);
    password = validator.trim(password);
    confirmPassword = validator.trim(confirmPassword);
    currency = validator.trim(currency);
    name = validator.trim(name);

    if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(confirmPassword) || !validator.isEmail(email)) {
        return res.status(401).json({
            message: 'Invalid credentials.'
        });
    }
    else if (password !== confirmPassword) {
        return res.status(401).json({
            message: 'Passwords must match.'
        });
    }
    else if (!validator.isStrongPassword(password)) {
        return res.status(401).json({
            message: 'Password must have 1 number, special character, uppercase and lowercase letter and a minimum length of 8.'
        });
    }
    if (name.length < 3) {
        return res.status(401).json({
            message: 'Name must be 3 characters or more.'
        });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (existingUser.rowCount) {
            return res.status(401).json({
                message: 'Account already exists.'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await pool.query('INSERT INTO users(email, name, "hashedPassword", currency) VALUES($1, $2, $3, $4)', [email, name, hashedPassword, currency]);
        const promises = Records.map(([category, amount, description, interval]) => {
            const queryText = `
    INSERT INTO finances (email, category, amount, description, timestamp)
    VALUES ($1, $2, $3, $4, NOW() - INTERVAL '${interval}')
  `;
            return pool.query(queryText, [email, category, amount, description]);
        });

        await Promise.all(promises);
        return res.status(200).json({
            message: `User ${email} successfully signed up! Please login to continue.`
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}