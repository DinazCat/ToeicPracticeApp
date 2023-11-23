import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function SpeakPart2() {
  const [imageFile, setImageFile] = useState(null);
  const [sampleAnswer, setSampleAnswer] = useState('');
  const [tip, setTip] = useState('');

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    
    let data = {
      Picture: imageFile,
      Explain: {
        SampleAnswer: sampleAnswer,
        Tips: tip,
      },
      Order:await api.countQuestion('SpeakPart2')
    }
    //console.log(data);

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
     await api.addQuestion('SpeakPart2', data);
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Speak part 2</h2>
      <div className='fileContainer'>

        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setImageFile(e.target.value)} value={imageFile}/>
        </label>
      </div>


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

export default SpeakPart2