import React, { useState } from 'react';
import { Card, Input } from 'antd';

type CoursesInputStringProps = {
    title: string,
    type: string,
    value: string, 
    setValue: (val: string) => void
  }
  
  function CoursesInputString({title, type, value, setValue}: CoursesInputStringProps) {
    const [isEditing, setIsEditing] = useState(false);
    return (
      <div className={"flex"}>
        <p className={"my-auto"}>{title}:</p>
        {!isEditing ?
          <div className={"flex"} onClick={() => setIsEditing(true)}>
            <p className={"my-auto ml-2"}>{value}</p>
            <i className={"fa-solid fa-pencil"}/>
          </div>
          :
          <div>
            <Input
              type={type}
              className={"ml-2 w-[13rem]"}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <i className={"fa-solid fa-check"} onClick={() => setIsEditing(false)}/>
          </div>
        }
      </div>
    )
  }

type CoursesCardProps = {
    courseTitle: string,
    labTeacher: string,
    courseTeacher: string,
    hasExam: boolean,
    //examDate: Date,
    hasPartialExam: boolean, 
    //partialDate: Date,
    hasHomeworkNotation: boolean, 
    hasLaboratoryGrading: boolean,
    hasPresentGrading: boolean,
    noOfCredits: '1' | '4' | '5' | '6'  , 
  };

function CoursesCard({
    courseTitle,
    labTeacher,
    courseTeacher,
    hasExam,
    hasPartialExam, 
    hasHomeworkNotation, 
    hasLaboratoryGrading,
    hasPresentGrading,
    noOfCredits, 
  }: CoursesCardProps){
    return(
    <Card 
        title="Courses">
        <Card>
            <CoursesInputString title={"Course name"} value={courseTitle} setValue={() => {}} type={'text'} />
            <CoursesInputString title={"Lab Teacher"} value={labTeacher} setValue={() => {}} type={'text'} />
            <CoursesInputString title={"Course Teacher"}  value={courseTeacher} setValue={() => {}} type={'text'} />
            <CoursesInputString title={"Number of Credits"} value={noOfCredits} setValue={() => {}} type={'text'} />
            <div>
                <p>Grading:</p>
                {hasExam? <p>-has Exam </p> : <p>-doesn't have Exam</p> } 
                {hasPartialExam? <p>-has Partial Exam </p> : <p>-doesn't have Partial Exam</p>} 
                {hasHomeworkNotation? <p>-has Homework Notation </p> : <p>-doesn't have Homework Notation</p>} 
                {hasLaboratoryGrading? <p>-has Laboratory Grading </p> : <p>-doesn't have Laboratory Grading</p> } 
                {hasPresentGrading? <p>-has Present Grading </p> : <p>-doesn't have Present Grading</p>} 
            </div>
        </Card>
    </Card>
    )

}
export default CoursesCard;