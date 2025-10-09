//THIRD PARTY COMPONENTS
import axios from 'axios';
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import Balancer from 'react-wrap-balancer';

//ASSETS AND STYLES
import '../Styles/Login.css';

export default function Login() {

    const navigate = useNavigate();

    async function loginUser(formData) {

        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/login',
                data: { email, password },
                withCredentials: true
            });
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            navigate('../user', { replace: true ,  state: { name: response.data.name } });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="login-container">
            <div className="login-container-wrapper">
                <div className="login-text-wrapper">
                    <h1 className="login-hero-text"><Balancer>Welcome! Login to Finance Tracker to get started!</Balancer></h1>
                    <p className="login-info-text">Don't have an account? <NavLink to='/signup'><span className='login-help-text'>Sign Up</span></NavLink></p>
                </div>
                <div className="login-form-wrapper">
                    <form className='form-login' action={loginUser}>
                        <div className="login-formgroup">
                            <label htmlFor='email'>Email</label>
                            <input type="email" id='email' name='email' required />
                        </div>
                        <div className="login-formgroup">
                            <label htmlFor='password'>Password</label>
                            <input type="password" id='password' name='password' required />
                        </div>
                        <button className='login-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )

}