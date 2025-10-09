//THIRD PARTY IMPORTS
import { useNavigate } from 'react-router-dom';

//STYLES AND ASSETS
import '../Styles/LandingPage.css';

export default function LandingPage() {

    const navigate = useNavigate();

    function navigateUser () {
        navigate('/signup');
    }

    return (
        <div className="landing-container">
            <header className="landing-header">
                <h1 className="landing-title">Finance<span>Tracker</span></h1>
                <p className="landing-subtitle">
                    Manage your money efficiently — track, edit, analyze, and stay on top of your finances.
                </p>
            </header>

            <section className="features-section">
                <h2 className="features-heading">Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>💰 Maintain Records</h3>
                        <p>Keep a detailed record of all your income and expenses in one place.</p>
                    </div>
                    <div className="feature-card">
                        <h3>✏️ Edit Records</h3>
                        <p>Update your financial entries anytime to keep data accurate and relevant.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🗑️ Delete Records</h3>
                        <p>Remove outdated or incorrect financial data with ease.</p>
                    </div>
                    <div className="feature-card">
                        <h3>➕ Add Records</h3>
                        <p>Quickly add new income or expense entries with user-friendly forms.</p>
                    </div>
                    <div className="feature-card">
                        <h3>📊 Analytics Dashboard</h3>
                        <p>View daily, monthly, and yearly summaries with pie and bar charts for better insights.</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚙️ Settings</h3>
                        <p>Change your preferred currency or permanently delete your account if needed.</p>
                    </div>
                </div>
            </section>

            <footer className="landing-footer">
                <button className="cta-btn" onClick={navigateUser}>Get Started</button>
                <p className="footer-text">© {new Date().getFullYear()} FinanceTracker. All rights reserved.</p>
            </footer>
        </div>
    );
}
