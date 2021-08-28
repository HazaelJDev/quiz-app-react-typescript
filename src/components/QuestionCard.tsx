import React from "react";
import { Card, Tag, Button } from 'antd';
//Types
import { AnswerObject } from '../App';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const gridStyle = {
  width: '40%',
  height: "80px",
  margin: '5%',  
  padding: "0%",
}

const btnCorrect = {
  backgroundColor: "#52c41a",
  color: "#111"
}

const btnWrong = {
  backgroundColor: "#ff4d4f",
  color: "#f9f9f9"
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <>
    <Tag color="processing" className="title__numberQuestion">
      Question: {questionNr} / {totalQuestions}
    </Tag>
    <Card title={question}>
      {answers.map((answer) => (
          <Card.Grid style={gridStyle} className="gridCard" key={answer} hoverable={!userAnswer}>
            <Button 
              style={(userAnswer?.correctAnswer === answer) ? btnCorrect : !(userAnswer?.correctAnswer === answer) && (userAnswer?.answer === answer) ? btnWrong : undefined} 
              className="gridButton" 
              type="link" 
              disabled={!!userAnswer} 
              value={answer} 
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{__html: answer}} />
            </Button>
          </Card.Grid>
      ))}
    </Card>
  </>
);

export default QuestionCard;
