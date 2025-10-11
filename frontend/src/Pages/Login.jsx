//CORE REACT IMPORTS
import { useContext, useState } from 'react';

//THIRD PARTY COMPONENTS
import axios from 'axios';
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';
import Balancer from 'react-wrap-balancer';
import validator from 'validator';

// CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';
import { AuthContext } from '../Contexts/AuthContext';

//ASSETS AND STYLES
import '../Styles/Login.css';
import loginIcon from '../Public/login.svg';
import passwordShowIcon from '../Public/password-show.svg';
import passwordHideIcon from '../Public/password-hide.svg';

export default function Login() {

    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [passwordInputState, setPasswordInputState] = useState('password');


    async function loginUser(formData) {

        const email = validator.trim(formData.get('email'));
        const password = validator.trim(formData.get('password'));

        try {
            const response = await axios({
                method: 'POST',
                url: `${url}/login`,
                data: { email, password },
                withCredentials: true
            });
            toast.success(response.data.message);
            setIsAuthenticated(true);
            navigate('../user', { replace: true, state: { name: response.data.name } });
        } catch (error) {
            setIsAuthenticated(false);
            toast.error(error.response.data.message);
        }
    }

    function updatePasswordInputState () {
        setPasswordInputState(prevPasswordInputState => {
            if (prevPasswordInputState === 'password') {
                setPasswordInputState('text');
            }
            else {
                setPasswordInputState('password');
            }
        })
    }

    return (
        <div className="login-container">
            <div className="login-image-container">
                <div className="image-wrapper">
                    <img src={loginIcon} alt="A computer login svg icon." width={328} />
                </div>
                <div className="login-container-wrapper">
                    <div className="login-text-wrapper">
                        <h1 className="login-hero-text"><Balancer>Welcome! Login to Finance Tracker to get started!</Balancer></h1>
                        <p className="login-info-text">Don't have an account? <NavLink to='/signup'><span className='login-help-text'>Sign Up</span></NavLink></p>
                    </div>
                    <div className="login-form-wrapper">
                        <form className='form-login' action={loginUser}>
                            <div className="login-formgroup">
                                <label htmlFor='email'>Email</label>
                                <input autoComplete='username' placeholder='test@example.com' type="email" id='email' name='email' required />
                            </div>
                            <div className="login-formgroup">
                                <label htmlFor='password'>Password</label>
                                <div className="password-wrapper">
                                    <input autoComplete='current-password' placeholder='******' type={passwordInputState} id='password' name='password' required />
                                    <img onClick={updatePasswordInputState} className='password-icon' src={(passwordInputState === 'password') ? passwordShowIcon : passwordHideIcon} alt="A password show icon." width={32} />
                                </div>
                            </div>
                            <button className='login-btn'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}