import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function ReadPart1({flag, index, complete, item}) {
  const [audioFile, setAudioFile] = useState(null);
  const [question, setQuestion] = useState(item?.Question||'');
  const [selectedAnswer, setSelectedAnswer] = useState(item?.Answer?.findIndex(function(item1) {
    return item1.status === true;
  })||(item&&item.Answer)?0:null);
  const [script, setScript] = useState(item?.Explain?.script||'');
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const [textR1, setTextR1] = useState((item&&item.Answer)?item.Answer[0]?.script:'');
  const [textR2, setTextR2] = useState((item&&item.Answer)?item.Answer[1]?.script:'');
  const [textR3, setTextR3] = useState((item&&item.Answer)?item.Answer[2]?.script:'');
  const [textR4, setTextR4] = useState((item&&item.Answer)?item.Answer[3]?.script:'');


  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
  };

  const handleSubmit = async () => {
    let answerL = [];
    let text = [textR1, textR2, textR3]
    for(let i = 0; i < 3; i++){
      if(i == selectedAnswer){
        answerL.push({
            status:true,
            script:text[i]
        });
      }
      else  answerL.push({
            status:false,
            script:text[i]
        });
    }

    if (flag === "submit") {
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order: await api.countQuestion("ReadPart1"),
      };
      alert('Add question successfully')
      await api.addQuestion("ReadPart1", data);
    } 
    else if(flag === 'Test'){
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      };
      alert('Add successfully')
      complete(data);
    }
    else if(flag === 'fix'){
      let data = {
        Question: question,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      };
      alert('Update successfully')
      complete(data);
    }
  };

  return (
    <div className='addQuestion'>
      {(flag!='Test')?<h2>Add Question Read part 1</h2>:<h2>Question {index+1} </h2>}
      {(flag==='see')&&<>
        <label>
        Question:
        <textarea value={item.Question} onChange={(e) => setQuestion(e.target.value)} rows="2" />
      </label>
      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10,display:'grid'}}>
      <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[0].status)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
             <input type='text' onChange={(e) => setTextR1(e.target.value)} value={item.Answer[0].script} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[1].status)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
        <input type='text' onChange={(e) => setTextR2(e.target.value)} value={item.Answer[1].script} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[2].status)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
        <input type='text' onChange={(e) => setTextR3(e.target.value)} value={item.Answer[2].script} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[3].status)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>D</button>
        <input type='text' onChange={(e) => setTextR4(e.target.value)} value={item.Answer[3].script} id='TR'></input> 
        </div>
      </div>

      <label>
        Script:
        <textarea value={item.Explain.script} onChange={(e) => setScript(e.target.value)} rows="4" />
      </label>

      <label>
        Tip:
        <textarea value={item.Explain.tip} onChange={(e) => setTip(e.target.value)} rows="4" />
      </label>

      <label>
        Translation:
        <textarea value={item.Explain.translate} onChange={(e) => setTranslation(e.target.value)} rows="4" />
      </label>
      </>}
      {(flag!=='see')&&<>
        <label>
        Question:
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows="2" />
      </label>
      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10,display:'grid'}}>
      <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((selectedAnswer == 0)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
             <input type='text' onChange={(e) => setTextR1(e.target.value)} value={textR1} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((selectedAnswer == 1)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
        <input type='text' onChange={(e) => setTextR2(e.target.value)} value={textR2} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((selectedAnswer == 2)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
        <input type='text' onChange={(e) => setTextR3(e.target.value)} value={textR3} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((selectedAnswer == 3)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(3)}}>D</button>
        <input type='text' onChange={(e) => setTextR4(e.target.value)} value={textR4} id='TR'></input> 
        </div>
      </div>

      <label>
        Script:
        <textarea value={script} onChange={(e) => setScript(e.target.value)} rows="4" />
      </label>

      <label>
        Tip:
        <textarea value={tip} onChange={(e) => setTip(e.target.value)} rows="4" />
      </label>

      <label>
        Translation:
        <textarea value={translation} onChange={(e) => setTranslation(e.target.value)} rows="4" />
      </label>
      </>}

      {(flag==='Test')&&<button onClick={handleSubmit}>Add</button>}
{(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default ReadPart1