//CORE REACT IMPORTS
import { motion } from "motion/react";

//ASSETS AND STYLES
import '../Styles/FadeIn.css';

export default function FadeIn({ children, duration = 0.7, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration,
                delay,
                ease: "easeIn"
            }}
        >
            {children}
        </motion.div>
    );
}
