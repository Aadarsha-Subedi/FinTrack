export default function logoutController(req, res) {

    const { email } = req.email || 'User';
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        path: '/',
        domain: 'finances-tool-backend.fly.dev'
    });

    return res.status(200).json({
        message: `${email} logged out successfully.`
    });

}