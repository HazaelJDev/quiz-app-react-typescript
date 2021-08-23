import React from "react";
import { Button, Card } from 'antd';
//Type
type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const gridStyle = {
    width: '50%',
    textAlign: 'center',
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <Button type="ghost" size="large" disabled={userAnswer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}} />
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
