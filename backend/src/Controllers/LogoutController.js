export default function logoutController(req, res) {

    const { email } = req.email || 'User';
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/'
    });

    return res.status(200).json({
        message: `${email} logged out successfully.`
    });

}