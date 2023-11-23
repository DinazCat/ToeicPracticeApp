import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function SpeakPart1() {
  const [translation, setTranslation] = useState('');
  const [question, setQuestion] = useState('');
  const [sampleAnswer, setSampleAnswer] = useState('');
  const [tip, setTip] = useState('');



  const handleSubmit = async () => {
    
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
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Speak part 1</h2>
      
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

      

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SpeakPart1