import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import turtleImg from "../assets/lrnr_turtle.png";
import boltImg from "../assets/bolt_icon.svg";
import moneyImg from "../assets/money_icon.svg";
import personImg from "../assets/person_icon.svg";


export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/account"); //lead to account. acting as if account creation feature included to "start" their journey by signing up
    }

    return (
        <div className="homepage-section">
            <div className="main-content">
                <img src={turtleImg} className="turtle-logo" alt="blue image of a turtle and lrnr logo" />
                <p className="homepage-headline">Your guided path to programming enlightment</p>
                <button className="begin-journey-btn" onClick={handleClick}>BEGIN JOURNEY</button>
            </div>

            <div className="subcontent">
                <div className="subcontent-divs">
                    <img src={boltImg} className="boltImg" alt="green bolt icon" />
                    <h3>Personalized Quizzes</h3>
                    <p>Greetings, young padawan. Are you ready to embark on a journey of personalized enlightment through the art of
                        coding? Our app can create custom quizzes that align with your coding skills and interests. Whether you are a
                        novice or a master, our system can generate questions that will test your proficiency in programming languages,
                        tools, and concepts.
                    </p>
                </div>

                <div className="subcontent-divs">
                    <img src={moneyImg} className="moneyImg" alt="green money icon" />
                    <h3>Rewarding</h3>
                    <p>Our app is designed to be both challenging and rewarding, so you can learn new concepts while enjoying the process.
                        With our personalized quiz app, you can track your progress, compete with your peers, and discover new areas of
                        expertise. The journey of a thousand lines of code begins with a single keystroke.
                    </p>
                </div>

                <div className="subcontent-divs">
                    <img src={personImg} className="personImg" alt="green person icon" />
                    <h3>Personal SME</h3>
                    <p>Welcome to the path of knowledge. Our app is like having a personal subject matter expert at your side, guiding
                        you on your journey towards wisdom.
                    </p>
                </div>
            </div>
        </div>
    )
}