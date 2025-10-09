//THIRD PARTY IMPORTS
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, NavLink } from 'react-router-dom';

// CONTEXTS, UTILS AND WEBHOOKS
import { url } from '../Utils/url';

//ASSETS AND STYLES
import '../Styles/Signup.css';
import signupIcon from '../Public/signup.svg';

export default function Signup() {

    const navigate = useNavigate();

    async function signupUser(formData) {

        const email = formData.get('email');
        const name = formData.get('name');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const currency = 'USD ($)';

        try {
            const response = await axios({
                method: 'POST',
                url: `${url}/signup`,
                data: { email, password, confirmPassword, name, currency },
            })
            if (response.status !== 200) {
                toast.error(response.data.message);
                return;
            }
            toast.success(response.data.message);
            navigate('../login', { replace: true });
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className="signup-container">
            <div className="signup-image-wrapper">
                <div className="image-wrapper">
                    <img src={signupIcon} alt="A cash svg icon." width={328} />
                </div>
                <div className="signup-wrapper">
                    <div className="signup-text-wrapper">
                        <h1 className="signup-hero-text">Create an account to get started!</h1>
                        <p className="signup-info-text">Already have an account? <NavLink to='/login'><span className='signup-help-text'>Log In</span></NavLink></p>
                    </div>
                    <div className="signup-form-wrapper">
                        <form className='form-signup' action={signupUser}>
                            <div className="signup-formgroup">
                                <label htmlFor='email'>Email</label>
                                <input placeholder='test@example.com' type="email" id='email' name='email' required />
                            </div>
                            <div className="signup-formgroup">
                                <label htmlFor='name'>Name</label>
                                <input placeholder='John' type="text" id='name' name='name' required />
                            </div>
                            <div className="signup-formgroup">
                                <label htmlFor='password'>Password</label>
                                <input placeholder='******' type="password" id='password' name='password' required />
                            </div>
                            <div className="signup-formgroup">
                                <label htmlFor='confirm-password'>Confirm Password</label>
                                <input placeholder='******' type="password" id='confirm-password' name='confirm-password' required />
                            </div>
                            <div className="signup-btn-wrapper">
                                <button className='signup-btn'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}