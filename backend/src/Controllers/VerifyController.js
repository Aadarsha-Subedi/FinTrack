//THIRD PARTY IMPORTS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './.env', quiet: true });

export default function VerifyController (req, res) {
    try {
        const token = req.cookies.accessToken;
        console.log('accessToken:', req.cookies.accessToken, '\n\n');

        if (!token) {
            return res.status(401).json({ loggedIn: false, message: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({
            loggedIn: true,
            email: decoded.email
        });
    } catch (error) {
        return res.status(401).json({
            loggedIn: false,
            message: 'Invalid or expired token'
        });
    }
}
