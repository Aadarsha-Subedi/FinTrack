//CORE REACT IMPORTS
import { easeIn, motion, stagger, useAnimate } from 'motion/react';
import { useEffect } from 'react';

//COMPONENTS
import FadeIn from './FadeIn.jsx';

//ASSETS AND STYLES
import '../Styles/Landing.css';
import githubIcon from '../Assets/github.png';
import linkedinIcon from '../Assets/linkedin.png';
import mockupIcon from '../Assets/mockup.jpg'
import { NavLink } from 'react-router-dom';

export default function Landing() {

    const headingDescription = 'Track, add, edit, and delete financial records effortlessly while viewing insightful analytics and customizing settings—all in one easy-to-use personal finance dashboard.'
    const [textScope, textAnimate] = useAnimate();

    function startTextAnimation() {
        textAnimate("h3", { opacity: 1 }, { duration: 1, ease: 'easeIn' })
        textAnimate("span", { opacity: 1, filter: 'blur(0px)', y: 0 }, { duration: 1, ease: 'easeIn', delay: stagger(0.05) })
    }

    useEffect(() => {
        startTextAnimation();
    }, [])

    return (
        <div className='landing__container'>
            <FadeIn>
                <NavLink to='/'>
                    <header className='landing__header'>
                        <h1 className="header__title">Fin<span>Track</span></h1>
                        <NavLink to='/login'><button className='header__btn--login'>Login</button></NavLink>
                    </header>
                </NavLink>
            </FadeIn>
            <main className='landing__main'>
                <div ref={textScope} className="main__container">
                    <motion.h3 className='main__heading'>Manage your money efficiently — track, edit, analyze, and stay on top of your finances.</motion.h3>
                    <div className="description__container">
                        {headingDescription.split(' ').map((word, index) => {
                            return (
                                <motion.span className='heading__description' key={word + index}>{word} &nbsp;</motion.span>
                            )
                        })}
                    </div>
                    <FadeIn>
                        <NavLink to='/signup'>
                            <div className='btn__container'>
                                <button className='main__btn--signup'>Sign Up</button>
                            </div>
                        </NavLink>
                    </FadeIn>
                    <FadeIn>
                        <motion.img initial={{ filter: 'blur(1px)' }} whileHover={{ filter: 'blur(0px)' }} width='100%' className='main__img--mockup' src={mockupIcon} alt="A mockup of the app." />
                    </FadeIn>
                </div>
            </main>
            <FadeIn>
                <footer className='landing__footer'>
                    <p className='footer__text'>&copy; FinTrack 2025</p>
                    <a href='https://github.com/Aadarsha-Subedi/FinTrack' target='_blank'><div className='img__container'>
                        <img src={githubIcon} alt="Github icon" width={24} />
                    </div>
                    </a>
                    <a href='https://www.linkedin.com/in/aadarsha-subedi-dev' target='_blank'>
                        <div className="img__container">
                            <img src={linkedinIcon} alt="Linkedln icon" width={24} />
                        </div>
                    </a>
                </footer>
            </FadeIn>
        </div>
    )

}