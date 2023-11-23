import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ListenPart2.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
import QuestionForm from '../components/QuestionForm';
function ListenPart3({flag, index, complete, item}) {
  const [audioFile, setAudioFile] = useState(item?.Audio||null);
  const [script, setScript] = useState(item?.Explain?.script||'');
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const [number, setNumber] = useState(item?.Question||[{
    Q:'',
    A:[{script:'', status:false},{script:'', status:false},{script:'', status:false},{script:'', status:false}]
  }]);

  const handleAudioChange = (e) => {
    const selectedAudio = e.target.files[0];
  
    if (selectedAudio) {
      setAudioFile(selectedAudio);
    } else {
      setAudioFile(null);
    }
  };

 

  const handleAnswerChange = (key, i) => {
    let list = number.slice();
    for(let j = 0; j < 4; j++){
        if(j === i){
            list[key].A[j].status=true
        }
        else{
            list[key].A[j].status=false
        }
    }
    setNumber(list)
  };

  const handleSubmit = async () => {
    let correct = [];
    for(let i = 0; i < number.length;i++){
      for(let j = 0; j < 4; j ++){
        if(number[i].A[j].status) correct.push(j)
      }
    }
    if (flag != "Test") {
      let data = {
        Audio: audioFile,
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
        Order: await api.countQuestion("ListenPart3"),
      };
      await api.addQuestion("ListenPart3", data);
    } else {
      let data = {
        Audio: audioFile,
        Question: number,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
      };
      complete(data);
    }
  }

  return (
    <div className='addQuestion'>
      {(flag!='Test')?<h2>Add Question Listen part 3</h2>:<h2>Question {index+1} </h2>}
      <div className='fileContainer'>
        <label>
          Audio:
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setAudioFile(e.target.value)} value={audioFile}/>
        </label>
      </div>


      <label>Question:</label>
      <button onClick={() => {
        let list = number.slice();
        list.push({
            Q:'',
            A:[{script:'', status:false},{script:'', status:false},{script:'', status:false},{script:'', status:false}]
          })
          setNumber(list)
      }} style={{marginLeft:5}}>Add question</button>
      {
        number.map((each,key)=>{
            return(
            <QuestionForm 
            index={key} 
            item = {each}
            handleAnswerChange={(i)=>handleAnswerChange(key,i)}
            questionText = {(t)=> {
                let list =number.slice()
                list[key].Q = t
                setNumber(list)
            }}
            answerText = {(i,t)=>{
                let list =number.slice()
                list[key].A[i].script = t
                setNumber(list)
            }}
             deleteSelf = {(j)=>{
                let list = number.slice()
                list.splice(j, 1); 
                setNumber(list)
                }}/>)
        })
      }


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

      {(flag!='Test')?<button onClick={handleSubmit}>Submit</button>:<button onClick={handleSubmit}>Add</button>}
    </div>
  );
}

export default ListenPart3