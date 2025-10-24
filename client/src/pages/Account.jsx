import "../styles/Account.css";
import flameImg from "../assets/flame_icon.svg";
import listImg from "../assets/list_icon.svg";
import personImg from "../assets/person_icon.svg";


export default function Account() {
    return (
        <div className="account-section">
            <h1 className="page-title">Account</h1>

            <div className="account-content">
                <div className="account-subcontent">
                    <img src={flameImg} className="flameImg" alt="green flame icon" />
                    <h3>Streak</h3>
                    <p>You have a streak of 349 days!</p>
                </div>

                <div className="account-subcontent">
                    <img src={listImg} className="listImg" alt="green list icon" />
                    <h3>Platinum Quizzes</h3>
                    <p>golang - Intermediate</p>
                    <p>JavaScript - Beginner</p>
                    <p>AWS - Beginner</p>
                </div>

                <div className="account-subcontent">
                    <img src={personImg} className="personImg" alt="green person icon" />
                    <h3>lrnr Level: 2</h3>
                    <p>150/200 XP</p>
                </div>
            </div>
        </div>
    )
}