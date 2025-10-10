export default function logoutController(req, res) {

    const email = req.email;
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/'
    });
    return res.status(200).json({
        message: `${email} logged out successfully.`
    });

}