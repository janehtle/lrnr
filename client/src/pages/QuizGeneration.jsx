import '../styles/QuizGeneration.css';
// import 'dotenv/config'; - can't use this in frontend

import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/thinking.png';
import restart from '../assets/restart.svg'

export default function QuizGeneration() {
  const [error, setError] = useState('');
  const [visibleBlock, setVisibleBlock] = useState([true, false]);
  const [logoVisible, setLogoVisible] = useState(true);
  const [quizVisible, setQuizVisible] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false)
  const [results, setResults] = useState([])
  const [questions, setQuestions] = useState([]);
  const [qIndex, setqIndex] = useState(0);
  const [score, setScore] = useState(null)
  const [valid, setValid] = useState(true)
  const answerRef = useRef('');
  const [answers, setAnswers] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URL;

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const userChoices = Object.fromEntries(data.entries());
    let topic = userChoices.topic;
    let expertise = userChoices.expertise;
    let num = userChoices.num;
    let style = userChoices.style;
    if (!topic || !expertise || !num || !style) {
      console.log('All fields are required');
      setError('All fields are required');
    } else {
      setError('');
      console.log(userChoices);
      async function postResponse(input) {
        try {
          const response = await fetch(`${backend}/api/quiz`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          });
          if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
          }
          let data = await response.json();
          console.log('success:', data);
          setQuestions(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      postResponse({ topic, expertise, num, style });
      setVisibleBlock([false, true])
      setLogoVisible(true)
      setTimeout(function () {
        setQuizVisible(true), setLogoVisible(false);
      }, 5000);
    }
  }

  async function postAnswers(questionsData, answerData) {
    const qna = questionsData.map((q, i) => ({
      question: q,
      answer: answerData[i],
    }));
    try {
      const response = await fetch(`${backend}/api/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qna }),
      });
      if (!response.ok) {
        throw new Error(`error status: ${response.status}`);
      }
      const data = await response.json();
      setScore(data.score)
      setResults(data.result)
      console.log("Score: " + score)
      console.log('Successfully POST answers:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleAnswerSubmit(e) {
    e.preventDefault();
    const newAnswer = answerRef.current.value.trim();
    if (!newAnswer) {
      setValid(false)
      return
    }
    setValid(true)
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    answerRef.current.value = ""
    setqIndex((prev) => prev + 1);
    console.log(updatedAnswers);
    if (qIndex === questions.length - 1) {
      console.log('complete');
      postAnswers(questions, updatedAnswers);
      setQuizVisible(false)
      setLogoVisible(true)
      setTimeout(function () {
        setResultsVisible(true), setLogoVisible(false);
      }, 6000)
    }
  }

  useEffect(() => {
    postAnswers(questions, answers)
  }, [])

  function handleNewQuiz() {
    setVisibleBlock([true, false])
    setResultsVisible(false)
    setQuizVisible(false)
    setqIndex(0)
  }

  return (
    <div className="main-body">
      <div
        className="quizGenForm"
        style={{ display: visibleBlock[0] ? 'block' : 'none' }}
      >
        <h1 className="heading">Quiz Generation Options</h1>
        <p className="subheading">
          Please choose your preferences below to generate your personalized
          quiz
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="topic-select">Topic</label>
          <select defaultValue="" name="topic" id="topic-select">
            <option value="" disabled></option>
            <option value="golang">golang</option>
            <option value="aws">aws</option>
            <option value="javascript">javascript</option>
            <option value="CI/CD">CI/CD</option>
            <option value="home gardens">home gardens</option>
            <option value="coffee">coffee</option>
            <option value="finger foods">finger foods</option>
          </select>
          <label htmlFor="exp-select">Expertise</label>
          <select defaultValue="" name="expertise" id="exp-select">
            <option disabled></option>
            <option value="novice">novice</option>
            <option value="intermediate">intermediate</option>
            <option value="expert">expert</option>
          </select>
          <label htmlFor="num-select">Number of Questions</label>
          <select defaultValue="" name="num" id="num-select">
            <option disabled></option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <label htmlFor="style-select">Style of Questions</label>
          <select defaultValue="" name="style" id="style-select">
            <option disabled></option>
            <option value="master oogway">master oogway</option>
            <option value="1940's gangster">1940's gangster</option>
            <option value="teaching an 8 year old">
              like I'm an 8 year old
            </option>
            <option value="normal">normal</option>
            <option value="jedi">jedi</option>
            <option value="captain jack sparrow">captain jack sparrow</option>
            <option value="matthew mcconaughey">matthew mcconaughey</option>
          </select>
          <span id="required-message">{error}</span>
          <br></br>
          <button className="submit-btn" type="submit">
            SUBMIT
          </button>
        </form>
      </div>

      <div
        className="generatedQuiz"
        style={{ display: visibleBlock[1] ? 'block' : 'none' }}
      >
        <img
          id="thinking-logo"
          alt="thinking logo"
          src={logo}
          style={{ display: logoVisible ? 'block' : 'none' }}
        ></img>
        <div style={{ display: quizVisible ? 'block' : 'none' }}>
          <h1 className="qCounter">
            {qIndex + 1} of {questions.length}
          </h1>
          <h1>Question</h1>
          <p className="subheading">{questions[qIndex]}</p>
          <form>
            <h1 className="your-answer">Your Answer</h1>
            <label htmlFor="answer">Answer</label>
            <input
              name={`answer${qIndex}`}
              ref={answerRef}
              id="answer"
              type="text"
              style={valid ? { borderColor: "rgb(41, 183, 164)" } : { borderColor: "red" }}
            ></input>
            <button
              onClick={handleAnswerSubmit}
              className="submit-btn"
              type="submit"
            >
              SUBMIT ANSWER
            </button>
          </form>
        </div>
      </div>
      <div
        className="resultsPage"
        style={{ display: resultsVisible ? 'block' : 'none' }}
      >
        <h1 className="results-header">Your Results: {score}/{questions.length}</h1>
        <div className="results-summary">
          {results.map((result, index) => {
            return (
              <div className="result-div" key={index}>
                <h2>Question #{index + 1}: {result.validity}</h2>
                <p>{result.explanation}</p>
              </div>
            )
          })}
          <button className="newQuiz" onClick={handleNewQuiz}>New Quiz <img id="restart" src={restart}></img></button>
        </div>
      </div>
    </div>
  );
}
