import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function SpeakPart1({flag, item, complete}) {
  const [translation, setTranslation] = useState(item?.Explain?.Translation||'');
  const [question, setQuestion] = useState(item?.Question||'');
  const [sampleAnswer, setSampleAnswer] = useState(item?.Explain?.SampleAnswer||'');
  const [tip, setTip] = useState(item?.Explain?.Tips||'');



  const handleSubmit = async () => {
    
   if(flag==='submit')
   {
    let data = {
      Question: question,
      Explain: {
        SampleAnswer: sampleAnswer,
        Tips: tip,
        Translation:translation,
      },
      Order:await api.countQuestion('SpeakPart1')
    }
    //console.log(data);
    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1); 
     await api.addQuestion('SpeakPart1', data);
   }
   else if(flag==='fix'){
    let data = {
      Question: question,
      Explain: {
        SampleAnswer: sampleAnswer,
        Tips: tip,
        Translation:translation,
      },
    }
    complete(data)
   }
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Speak part 1</h2>
      
     {(flag==='see')&&<>
     <label>
        Question:
        <textarea value={item.Question} onChange={(e) => setQuestion(e.target.value)} rows="4" />
      </label>

      <label>
        Translation:
        <textarea value={item.Explain.SampleAnswer} onChange={(e) => setTranslation(e.target.value)} rows="3" />
      </label>
      <label>
        Tips:
        <textarea value={item.Explain.Tips} onChange={(e) => setTip(e.target.value)} rows="4" />
      </label>

      <label>
        Sample Answer:
        <textarea value={item.Explain.Translation} onChange={(e) => setSampleAnswer(e.target.value)} rows="12" />
      </label>
     </>}
     {(flag!=='see')&&<>
     <label>
        Question:
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows="4" />
      </label>

      <label>
        Translation:
        <textarea value={translation} onChange={(e) => setTranslation(e.target.value)} rows="3" />
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

export default SpeakPart1