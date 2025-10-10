//THIRD PARTY IMPORTS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env', quiet: true });

export default async function verifyToken(req, res, next) {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(403).json({
            message: 'Access denied.'
        });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
        req.email = decoded.email;
        next();
    } catch (error) {
        res.clearCookie('acccessToken');
        return res.status(403).json({
            message: 'Access denied. Invalid or expired token.'
        });
    }

}