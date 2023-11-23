import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/Questions.css';
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function SpeakPart3() {
  const [translation, setTranslation] = useState(['','','','']);
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState(['','','']);
  const [sampleAnswer, setSampleAnswer] = useState(['','','']);
  const [tip, setTip] = useState(['','','']);

const handleSetQuestion=(i, t)=>{
    let list = question.slice();
    list[i] = t;
    setQuestion(list)
}

const handleSetTrans=(i, t)=>{
    let list = translation.slice();
    list[i] = t;
    setTranslation(list)
}
const handleSetSample=(i, t)=>{
    let list = sampleAnswer.slice();
    list[i] = t;
    setSampleAnswer(list)
}
const handleSetTips=(i, t)=>{
    let list = tip.slice();
    list[i] = t;
    setTip(list)
}
  const handleSubmit = async () => {
    
    let data = {
      Question: question,
      Context: context,
      Explain: {
        SampleAnswer: sampleAnswer,
        Tips: tip,
        Translation:translation,
      },
      Order:await api.countQuestion('SpeakPart3')
    }
    //console.log(data);

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
     await api.addQuestion('SpeakPart3', data);
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Speak part 3</h2>
      
      <label>
      <h3>Context:</h3>
        <textarea value={context} onChange={(e) => setContext(e.target.value)} rows="4" />
      </label>
      <div style={{display:'grid'}}>
      <h3 style={{marginLeft:5}}>Question:</h3>
      <div style={{backgroundColor:'#E8E8E8',display:'grid'}}>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>1/</h3>
             <input type='text' onChange={(e) => {handleSetQuestion(0,e.target.value)}} value={question[0]} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>2/</h3>
             <input type='text' onChange={(e) => {handleSetQuestion(1,e.target.value)}} value={question[1]} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>3/</h3>
             <input type='text' onChange={(e) => {handleSetQuestion(2,e.target.value)}} value={question[2]} id='TR'></input> 
        </div>
        </div>
        </div>

      <label>
      <h3>Translation:</h3>          
      <label>
        Context:
        <textarea value={translation[0]} onChange={(e) => handleSetTrans(0,e.target.value)} rows="4" />
      </label>
      <label>
        Question:
        <div style={{display:'grid', backgroundColor:'#E8E8E8', marginTop:5}}>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>1/</h3>
             <input type='text' onChange={(e) => {handleSetTrans(1,e.target.value)}} value={translation[1]} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>2/</h3>
             <input type='text' onChange={(e) => {handleSetTrans(2,e.target.value)}} value={translation[2]} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>3/</h3>
             <input type='text' onChange={(e) => {handleSetTrans(3,e.target.value)}} value={translation[3]} id='TR'></input> 
        </div>
        </div>
      </label>
      </label>
      <div style={{marginTop:20}}>
      <h3>Sample Answer:</h3>
        <div style={{display:'grid', marginTop:5}}>
         <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>1/</h3>
             <textarea onChange={(e) => {handleSetSample(0,e.target.value)}} value={sampleAnswer[0]} id='TR'></textarea> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>2/</h3>
             <textarea  onChange={(e) => {handleSetSample(1,e.target.value)}} value={sampleAnswer[1]} id='TR'></textarea> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>3/</h3>
             <textarea  onChange={(e) => {handleSetSample(2,e.target.value)}} value={sampleAnswer[2]} id='TR'></textarea> 
        </div>
        </div>
      </div>
      <div style={{marginTop:20}}>
      <h3>Tips:</h3>
        <div style={{display:'grid',backgroundColor:'#E8E8E8', marginTop:5}}>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>1/</h3>
             <textarea  onChange={(e) => {handleSetTips(0,e.target.value)}} value={tip[0]} id='TR'></textarea> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>2/</h3>
             <textarea  onChange={(e) => {handleSetTips(1,e.target.value)}} value={tip[1]} id='TR'></textarea> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5, marginTop:5}}>
            <h3>3/</h3>
             <textarea  onChange={(e) => {handleSetTips(2,e.target.value)}} value={tip[2]} id='TR'></textarea> 
        </div>
        </div>
      </div>

      <button style={{ marginTop:10}} onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SpeakPart3