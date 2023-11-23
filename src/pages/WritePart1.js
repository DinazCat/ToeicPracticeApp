import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function WritePart1() {
  const [imageFile, setImageFile] = useState(null);
  const [word, setWord] = useState('');
  const [sampleAnswer, setSampleAnswer] = useState('');
  const [tip, setTip] = useState('');

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  const handleSubmit = async () => {
    
    let data = {
      Picture: imageFile,
      SugesstedWord:word,
      Explain: {
        SampleAnswer: sampleAnswer,
        Tips: tip,
      },
      Order:await api.countQuestion('WritePart1')
    }
    console.log(data);

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
    // await api.addQuestion('WritePart1', data);
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Write part 1</h2>
      <div className='fileContainer'>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setImageFile(e.target.value)} value={imageFile}/>
        </label>
      </div>

      <label>
        Suggest word:
        <input type='text' value={word} onChange={(e) => setWord(e.target.value)}  />
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

export default WritePart1