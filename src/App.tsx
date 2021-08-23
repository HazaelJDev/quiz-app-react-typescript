import React, {useState} from 'react';
import './App.css';
import { fetchQuizQuestions } from './API';
//Components
import { Button } from 'antd';
import QuestionCard from './components/QuestionCard';
// Types
import {QuestionState,Difficulty} from './API';

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[

  ]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY));

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {
    
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <Button type="primary" size="large" className="start" onClick={startTrivia}>Start</Button>
      ) : null}
      {!gameOver ? <p className="score">Score:</p> : null}
      {loading && <p>Loading Questions...</p>}
      { !loading && !gameOver && (
        <QuestionCard 
        questionNr={number+1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      )}
      {!gameOver && !loading &&userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <Button type="primary" size="large" className="next" onClick={nextQuestion}>Next Question</Button> 
      ) : null}
    </div>);
}

export default App;
