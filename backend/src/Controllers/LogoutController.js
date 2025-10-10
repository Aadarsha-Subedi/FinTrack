export default function logoutController(req, res) {

    const email = req.email;
        res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true, // Important for production (HTTPS)
        sameSite: 'none', // Important for cross-origin requests
        path: '/'
    });
    return res.status(200).json({
        message: `${email} logged out successfully.`
    });

}