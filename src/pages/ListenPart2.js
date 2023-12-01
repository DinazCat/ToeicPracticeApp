import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function ListenPart2({flag, index, complete, item}) {
  const [audioFile, setAudioFile] = useState(item?.Audio||null);
  const [imageFile, setImageFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(item?.Answer?.findIndex(function(item1) {
    return item1.status === true;
  })||(item&&item.Answer)?0:null);
  const [script, setScript] = useState(item?.Answer?.findIndex(function(item1) {
    return item1.status === true;
  })||'');
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const [textR1, setTextR1] = useState((item&&item.Answer)?item.Answer[0]?.script:'');
  const [textR2, setTextR2] = useState((item&&item.Answer)?item.Answer[1]?.script:'');
  const [textR3, setTextR3] = useState((item&&item.Answer)?item.Answer[2]?.script:'');

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

    // const formData = new FormData();
    // formData.append('image', {
    //   uri: imageFile.uri,
    //   name: 'image.jpg',
    //   type: 'image/jpg',
    // });   
    
    const formData1 = new FormData();
    formData1.append('audio', audioFile);

    console.log(audioFile);
    if(flag==='submit'){
      let data = {
        Audio: audioFile,
        Answer: answerL,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Order:await api.countQuestion('ListenPart2')
      }
      alert('Add question successfully')
      await api.addQuestion('ListenPart2', data);
    }
    else if(flag==='fix') {
      let data = {
        Audio: audioFile,
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
    else if(flag==='Test'){
      let data = {
        Audio: audioFile,
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
   

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
  
  };

  return (
    <div className='addQuestion'>
     {(flag!=='Test')?<h2>Add Question Listen part 2</h2>:<h2>Question {index+1} </h2>}
     {(flag==='see')&&
     <>
      <div className='fileContainer'>
      <label>
          Audio:
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setAudioFile(e.target.value)} value={item.Audio}/>
        </label>
      </div>


      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10, display:'grid'}}>
      <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[0])?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(0)}}>A</button>
             <input type='text' onChange={(e) => setTextR1(e.target.value)} value={textR1} id='TR'></input> 
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[1])?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(1)}}>B</button>
        <input type='text' onChange={(e) => setTextR2(e.target.value)} value={textR2} id='TR'></input>
        </div>
        <div style={{display:'inline-flex', marginLeft:5}}>
        <button className={((item.Answer[2])?'roundBtn2':'roundBtn1')} onClick={() => {handleAnswerChange(2)}}>C</button>
        <input type='text' onChange={(e) => setTextR3(e.target.value)} value={textR3} id='TR'></input> 
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
     </>
     }
      {(flag!=='see')&&
     <>
      <div className='fileContainer'>
      <label>
          Audio:
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setAudioFile(e.target.value)} value={audioFile}/>
        </label>
      </div>


      <label>Answer:</label>
      <div style={{marginTop:10, marginBottom:10, display:'grid'}}>
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

export default ListenPart2