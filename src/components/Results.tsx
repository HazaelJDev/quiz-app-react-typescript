import React from "react";
import { Button } from 'antd';
import { gifts } from '../App';

type Props = {
    callback: any,
    score: number,
    totalQ: number, 
}

const Results: React.FC<Props> = ({
 callback,
 score,
 totalQ
}) => (
    <div className="resultsContainer">
        <div className="gift">
            <h1>Your score is {score} of {totalQ}!</h1>
            <div className="gift__iframe" dangerouslySetInnerHTML={{ __html: (score >= 7) ? gifts["congratulations"] : gifts["fail"] }} />
        </div>
        <Button type="primary" size="large" className="results" onClick={callback}>New Game</Button>
    </ div>    
);

export default Results;
