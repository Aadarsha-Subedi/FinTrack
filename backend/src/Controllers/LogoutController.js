export default function logoutController(req, res) {

    const email = req.email?.email || 'User';
    res.clearCookie('accessToken');
    return res.status(200).json({
        message: `${email} logged out successfully.`
    }).send({redirect: true, location: '/login'});

}