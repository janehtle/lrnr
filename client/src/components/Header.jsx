import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
    return (
        <header>
            <Link to="/" className="logo">lrnr</Link>

            <ul className="nav-links">
                <li>
                    <Link to="/account">Account</Link>
                </li>

                <li>
                    <Link to="/quiz">Quiz Generation</Link>
                </li>
            </ul>
        </header>
    )
}