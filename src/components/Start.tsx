import React from "react";
import { Button } from 'antd';
import { gifts } from '../App';

type Props = {
    callback: any,
}

const Start: React.FC<Props> = ({
 callback
}) => (
    <div className="startContainer">
        <div className="gift">
            <div className="gift__iframe" dangerouslySetInnerHTML={{ __html: gifts["welcome"]}} />
            <p className="gift__credits"><a href="https://github.com/HazaelJDev">by hazajdev</a></p>
        </div>
        <Button type="primary" size="large" className="start" onClick={callback}>Start</Button>
    </ div>    
);

export default Start;
