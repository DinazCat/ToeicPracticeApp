
import React, { useState, useEffect } from 'react';
import "../styles/Questions.css";
const QuestionForm=({index, handleAnswerChange,deleteSelf, item, questionText,answerText, flag}) =>{
    // const [qText, SetQText] = useState([])
    // const [q1, SetQ1] = useState(false)
    // const [q2, SetQ2] = useState(false)
    // const [q3, SetQ3] = useState(false)
    // const [q4, SetQ4] = useState(false)
    // useEffect=(()=>{
    //     let list = []
    //     for(let i = 0; i < 4; i++){
    //         if(item.A[i].status){
    //         list.push(true)
    //         }
    //         else list.push(false)
    //     }
    //     SetQText(list)
    // },[item])
  return (
    <div style={{marginTop:10, backgroundColor:'#E8E8E8'}}>
      <div style={{display:'inline-flex', marginTop:5}}>
        <h3 style={{marginLeft:5}}>{index+1}/</h3>
      <input type='text' onChange={(e) => {questionText(e.target.value)}} value={item.Q} style={{width:500, marginLeft:5}}></input> 
      </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={(item.A[0].status?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
             <input type='text' onChange={(e) => {answerText(0,e.target.value)}} value={item.A[0].script} id='TR' ></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={(item.A[1].status?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
        <input type='text' onChange={(e) => {answerText(1,e.target.value)}} value={item.A[1].script} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={(item.A[2].status?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
        <input type='text' onChange={(e) =>{answerText(2,e.target.value)}} value={item.A[2].script} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={(item.A[3].status?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(3)}}>D</button>
        <input type='text' onChange={(e) =>{answerText(3,e.target.value)}} value={item.A[3].script}  id='TR'></input> 
        </div>
        {(flag!=='see')&&<button onClick={() => {deleteSelf(index)}} style={{ marginLeft:'90%'}}>Delete</button>}
      </div>
  )
}
export default QuestionForm