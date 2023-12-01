import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ListenPart2.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
import QuestionForm from '../components/QuestionForm';
function ReadPart3({flag, index, complete, item}) {
  const [script, setScript] = useState(item?.Explain?.script||'');
  const [tip, setTip] = useState(item?.Explain?.tip||'');
  const [translation, setTranslation] = useState(item?.Explain?.translate||'');
  const [paragraph, setParagraph] = useState(item?.Paragraph||'');
  const [number, setNumber] = useState(item?.Question||[{
    Q:'',
    A:[{script:'', status:false},{script:'', status:false},{script:'', status:false},{script:'', status:false}]
  }]);



 

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
    if (flag === "submit") {
      let data = {
        Question: number,
        Paragraph: paragraph,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
        Order: await api.countQuestion("ReadPart3"),
      };

      await api.addQuestion("ReadPart3", data);
    } 
    else if(flag === 'Test') {
      let data = {
        Question: number,
        Paragraph: paragraph,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
      };
      complete(data);
    }
    else if(flag === 'fix') {
      let data = {
        Question: number,
        Paragraph: paragraph,
        Explain: {
          script: script,
          tip: tip,
          translate: translation,
        },
        Correct: correct,
      };
      complete(data);
    }
  };

  return (
    <div className='addQuestion'>
      {(flag!='Test')?<h2>Add Question Read part 3</h2>:<h2>Question {index+1} </h2>}
     {(flag === 'see')&&
     <>
      <label>
        Paragraph:
        <textarea value={item.Paragraph} onChange={(e) => setParagraph(e.target.value)} rows="4" />
      </label>
      <label>Question:</label>
     
      {
        item?.Question?.map((each,key)=>{
            return(
            <QuestionForm 
            index={key} 
            item = {each}
            flag ={'see'}
            />)
        })
      }


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
     {(flag !== 'see')&&
     <>
      <label>
        Paragraph:
        <textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)} rows="4" />
      </label>
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
     </>}

      {(flag==='Test')&&<button onClick={handleSubmit}>Add</button>}
{(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default ReadPart3