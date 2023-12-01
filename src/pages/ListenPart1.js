import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
import { Flag } from '@mui/icons-material';
function ListenPart1({flag, index, complete, item}) {
  const [audioFile, setAudioFile] = useState(item?.Audio||'');
  const [imageFile, setImageFile] = useState(item?.Image ||'');
  const [question, setQuestion] = useState('');
  const trueIndex = item?.Answer?.findIndex(value => value === true);
const temp = trueIndex !== -1 ? trueIndex : null;
  const [selectedAnswer, setSelectedAnswer] = useState(temp);
  const [script, setScript] = useState(item?.Explain?.script||'');
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const location = useLocation();
  const handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];
  
    if (selectedAudio) {
      setAudioFile(selectedAudio);
    } else {
      setAudioFile(null);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e);
    if(flag==='update')
    {
      item.Answer[e] = true
      for(let i = 0; i < 4; i++)
      {
        if(i!==e)
        item.Answer[i]=false
      }
    }
  };

  const handleSubmit = async () => {
    let answerL = [];
    for(let i = 0; i < 4; i++){
      if(i == selectedAnswer){
        answerL.push(true);
      }
      else answerL.push(false);
    }

    // const formData = new FormData();
    // formData.append('image', {
    //   uri: imageFile.uri,
    //   name: 'image.jpg',
    //   type: 'image/jpg',
    // });   
    
    const formData1 = new FormData();
    formData1.append('audio', audioFile);

    console.log(audioFile);

  

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    if(flag==='submit')
    {
      let data = {
        Audio: audioFile,
        Image: imageFile,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order:await api.countQuestion('ListenPart1')
      }
      alert('Add question successfully')
      await api.addQuestion('ListenPart1', data);
    }
    else if(flag==='Test') {
      let data = {
        Audio: audioFile,
        Image: imageFile,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      }
      alert('Add successfully')
      complete(data)
    }
    else if(flag==='fix') {
      let data = {
        Audio: audioFile,
        Image: imageFile,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
      }
      alert('Update successfully')
      complete(data)
    }
  };

  return (
    <div className='addQuestion'>
      {(flag!=='Test')?<h2>Add Question Listen part 1</h2>:<h2>Question {index+1} </h2>}
      {(flag==='see')&&<>
       <div className='fileContainer'>
       <label>
         Audio:
         <input type="file" accept="audio/*" onChange={handleAudioChange} />
         <text style={{font:12}}>or input the link:</text>
         <input type='url' onChange={(e) => setAudioFile(e.target.value)} value={item.Audio}/>
       </label>

       <label>
         Image:
         <input type="file" accept="image/*" onChange={handleImageChange} />
         <text style={{font:12}}>or input the link:</text>
         <input type='url' onChange={(e) => {setImageFile(e.target.value)
        }} value={item.Image}/>
       </label>
     </div>

     <label>Answer:</label>
     <div style={{marginTop:10, marginBottom:10}}>
     <button className={((item.Answer[0] || selectedAnswer == 0)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
     <button className={((item.Answer[1] || selectedAnswer == 1)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
     <button className={((item.Answer[2] || selectedAnswer == 2)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
     <button className={((item.Answer[3] || selectedAnswer == 3)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(3)}}>D</button>
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
      </>
  }
      {(flag!=='see')&&<>
       <div className='fileContainer'>
       <label>
         Audio:
         <input type="file" accept="audio/*" onChange={handleAudioChange} />
         <text style={{font:12}}>or input the link:</text>
         <input type='url' onChange={(e) => setAudioFile(e.target.value)} value={audioFile}/>
       </label>

       <label>
         Image:
         <input type="file" accept="image/*" onChange={handleImageChange} />
         <text style={{font:12}}>or input the link:</text>
         <input type='url' onChange={(e) => setImageFile(e.target.value)} value={imageFile}/>
       </label>
     </div>

     <label>Answer:</label>
     <div style={{marginTop:10, marginBottom:10}}>
     <button className={((selectedAnswer === 0)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
     <button className={((selectedAnswer === 1)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
     <button className={((selectedAnswer === 2)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
     <button className={((selectedAnswer === 3)?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(3)}}>D</button>
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
      </>
  }
      {(flag==='Test')&&<button onClick={handleSubmit}>Add</button>}
{(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default ListenPart1