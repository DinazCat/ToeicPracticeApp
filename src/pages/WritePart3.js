import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function WritePart3({item,complete,flag}) {
  const [question, setQuestion] = useState(item?.Question||'');
  const [sampleAnswer, setSampleAnswer] = useState(item?.Explain?.SampleAnswer||'');
  const [tip, setTip] = useState(item?.Explain?.Tips||'');



  const handleSubmit = async () => {
    
    if(flag==='submit'){
      let data = {
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
        Order:await api.countQuestion('WritePart3')
      }
       await api.addQuestion('WritePart3', data);
    }
    else if (flag==='fix'){
      let data = {
        Question: question,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        }
      }
      complete(data)
    }
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Write part 3</h2>
      
      {(flag==='see')&&<>
      <label>
        Question:
        <textarea value={item.Question} onChange={(e) => setQuestion(e.target.value)} rows="4" />
      </label>


      <label>
        Tips:
        <textarea value={item.Explain.Tips} onChange={(e) => setTip(e.target.value)} rows="4" />
      </label>

      <label>
        Sample Answer:
        <textarea value={item.Explain.SampleAnswer} onChange={(e) => setSampleAnswer(e.target.value)} rows="12" />
      </label>

      </>}
      {(flag!=='see')&&<>
      <label>
        Question:
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows="4" />
      </label>


      <label>
        Tips:
        <textarea value={tip} onChange={(e) => setTip(e.target.value)} rows="4" />
      </label>

      <label>
        Sample Answer:
        <textarea value={sampleAnswer} onChange={(e) => setSampleAnswer(e.target.value)} rows="12" />
      </label>

      </>}
      {(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default WritePart3