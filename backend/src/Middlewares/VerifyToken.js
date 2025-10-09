//THIRD PARTY IMPORTS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { response } from 'express';

export default async function verifyToken(req, res, next) {

    dotenv.config({ path: './.env', quiet: true });
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(403).json({
            message: 'Access denied.'
        });
    }

    try {
        const response = jwt.verify(accessToken, process.env.SECRET_KEY, (error, email) => {
            if (error) {
                return res.status(403).json({
                    message: 'Access denied.',
                });
            }
            req.email = email;
            next();
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }

}