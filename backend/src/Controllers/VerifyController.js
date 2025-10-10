//THIRD PARTY IMPORTS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env', quiet: true });

export default function VerifyController (req, res) {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(200).json({ loggedIn: false, message: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({
            loggedIn: true,
            email: decoded.email
        });
    } catch (error) {
        res.clearCookie('accessToken');
        return res.status(200).json({
            loggedIn: false,
            message: 'Invalid or expired token'
        });
    }
}
