import React, {useState} from 'react';
import './App.css';
import { fetchQuizQuestions } from './API';
//Components
import { Button, Tag } from 'antd';
import QuestionCard from './components/QuestionCard';
import SkeletonQuestionCard from './components/Skeletons/QuestionCardSkeleton';
import Start from './components/Start';
import Results from './components/Results';
// Types
import {QuestionState,Difficulty} from './API';

export const gifts = {
  congratulations: "<iframe src=https://giphy.com/embed/3o6fIUZTTDl0IDjbZS />",
  fail: "<iframe src=https://giphy.com/embed/S4BDGxHKIB6nW9PiyA />",
  welcome: "<iframe src=https://giphy.com/embed/5lWtoCrjLeqSUyUzPJ />",
}

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;


const App = () => {
  const [loading, setLoading] = useState(false);
  const [firstGame, setFirstGame] = useState(true);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY));
  
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setFirstGame(false);

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
    if(!gameOver){
      //Get user answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //Move on to the next question if not the last question
    const nextQuestion = number + 1;
    
    if(nextQuestion !== TOTAL_QUESTIONS){
      setNumber(nextQuestion);
    }

  };

  return (
    <div className="App">
      <h1 className="App__title">React Quiz</h1>
      {firstGame && (
        <Start callback={startTrivia} />
      )}
      {!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS && (<Tag color="geekblue" className="App__score">Score: {score}</Tag>)}
      {loading && (<SkeletonQuestionCard />)}
      { !loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
        <QuestionCard 
          questionNr={number+1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />                       
        )
      }
      {!gameOver && !loading &&userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS-1 ? (
        <Button type="primary" size="large" className="next" onClick={nextQuestion}>Next Question</Button> 
      ) : null}
      {!loading && userAnswers.length === TOTAL_QUESTIONS &&
        (<Results callback={startTrivia} score={score} totalQ={TOTAL_QUESTIONS} />)
      }
    </div>);
}

export default App;
