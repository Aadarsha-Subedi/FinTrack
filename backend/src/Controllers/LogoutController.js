export default function logoutController(req, res) {

    const { email } = req.email;
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false, // since localhost isn't HTTPS
        sameSite: 'lax', // not 'none' unless you use HTTPS
    });

    return res.status(200).json({
        message: `${email} logged out successfully.`
    });

}