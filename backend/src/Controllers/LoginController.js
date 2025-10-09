//THIRD PARTY IMPORTS
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//DATABASE
import pool from '../db/db.js';

export default async function loginController(req, res) {

    dotenv.config({ path: './.env', quiet: true });
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password) || !validator.isEmail(email)) {
        return res.status(401).json({
            message: 'Invalid credentials.'
        });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (!existingUser.rowCount) {
            return res.status(401).json({
                message: 'Invalid credentials.'
            })
        }

        const correctPassword = await bcrypt.compare(password, existingUser.rows[0].hashedPassword);
        const name = existingUser.rows[0].name;
        if (!correctPassword) {
            return res.status(401).json({
                message: 'Invalid credentials.'
            })
        }
        const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return res.status(200).json({
            message: `${email} successfully signed in!`,
            name: name
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}