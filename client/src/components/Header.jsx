import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/">lrnr</Link>

            <ul>
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