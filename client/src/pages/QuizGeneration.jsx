import "../styles/QuizGeneration.css"

import React, { useState, useRef } from "react";

export default function QuizGeneration() {

    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        const form = e.target;
        const data = new FormData(form);
        const userChoices = Object.fromEntries(data.entries());
        let topic = userChoices.topic
        let expertise = userChoices.expertise
        let num = userChoices.num
        let style = userChoices.style
        if (!topic || !expertise || !num || !style) {
            console.log("All fields are required")
            setError("All fields are required")
        } else {
            setError("")
            console.log(`submitting ${userChoices}`)
            async function postResponse(input) {
                try {
                    const response = await fetch('http://localhost:4000/api/quiz', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(input),
                    });
                    if (!response.ok) {
                        throw new Error(`error status: ${response.status}`);
                    }


                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }

    }

    return (
        <div className="main-body">
            <h1 className="heading">Quiz Generation Options</h1>
            <p className="subheading">Please choose your preferences below to generate your personalized quiz</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="topic-select">Topic</label>
                <select name="topic" id="topic-select">
                    <option disabled selected></option>
                    <option value="golang">golang</option>
                    <option value="aws">aws</option>
                    <option value="javascript">javascript</option>
                    <option value="CI/CD">CI/CD</option>
                    <option value="home gardens">home gardens</option>
                    <option value="coffee">coffee</option>
                    <option value="finger foods">finger foods</option>
                </select>
                <label htmlFor="exp-select">Expertise</label>
                <select name="expertise" id="exp-select">
                    <option disabled selected></option>
                    <option value="novice">novice</option>
                    <option value="intermediate">intermediate</option>
                    <option value="expert">expert</option>
                </select>
                <label htmlFor="num-select">Number of Questions</label>
                <select name="num" id="num-select">
                    <option disabled selected></option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <label htmlFor="style-select">Style of Questions</label>
                <select name="style" id="style-select">
                    <option disabled selected></option>
                    <option value="master oogway">master oogway</option>
                    <option value="1940's gangster">1940's gangster</option>
                    <option value="teaching an 8 year old">like I'm an 8 year old</option>
                    <option value="normal">normal</option>
                    <option value="jedi">jedi</option>
                    <option value="captain jack sparrow">captain jack sparrow</option>
                    <option value="matthew mcconaughey">matthew mcconaughey</option>
                </select>
                <span id="required-message">{error}</span>
                <br></br>
                <button className="submit-btn" type="submit">SUBMIT</button>
            </form>
        </div>
    )
}
