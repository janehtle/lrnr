import "../styles/Results.css";
import { useNavigate } from "react-router-dom";
//in order to have button route to another page, a hook must be used and functionality needs to be created

export default function Results() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/quiz"); //leads to QuizGeneration.jsx page
    }

    return (
        <div className="results">
            <h1 className="lrnr">lrnr</h1>
            <div id="display-score">Questions Right:</div>
            <button className="new-quiz-btn" onClick={handleClick}>TRY ANOTHER QUIZ</button>
        </div>
    )
}