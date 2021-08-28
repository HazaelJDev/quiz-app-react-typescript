import React from "react";
import { Skeleton } from 'antd';


const SkeletonQuestionCard: React.FC = () => (
  <div className="skeleton">
    <div className="title">
      <Skeleton.Button className="title__score" active={true} size="default" shape="square" />
      <Skeleton.Button className="title__numberQuestion" active={true} size="default" shape="square" />
      <Skeleton.Input className="title__question" active={true} size="default" />  
    </div>
    <div className="bodySkeleton">
      <Skeleton.Button className="bodySkeleton__button" active={true} size="default" shape="square"/>
      <Skeleton.Button className="bodySkeleton__button" active={true} size="default" shape="square"/>
      <Skeleton.Button className="bodySkeleton__button" active={true} size="default" shape="square"/>
      <Skeleton.Button className="bodySkeleton__button" active={true} size="default" shape="square"/>
    </div>
  </div>
);

export default SkeletonQuestionCard;
