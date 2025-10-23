import { Link } from "react-router-dom";
import "../styles/Footer.css" 

export default function Footer() {
    return (
        <footer>
            <p className="footer-description">
                Embrace the power of our app and unlock the secrets of the universe, one quiz at a time. As I always say, 
                "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present."
            </p>

            <div className="nav-section">
                <h2 className="nav-section-title">Links</h2>

                <ul className="footer-nav-links">
                    <li>
                        <Link to="/">Home</Link>    
                    </li>

                    <li>
                        <Link to="/account">Account</Link>
                    </li>

                    <li>
                        <Link to="/quiz" className="footer-link">Quiz Generation</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}