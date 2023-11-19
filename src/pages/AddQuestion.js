import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import { addQuestion } from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function AddQuestion() {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [script, setScript] = useState('');
  const [tip, setTip] = useState('');
  const [translation, setTranslation] = useState('');

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
    setSelectedAnswer(e.target.value);
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

    let data = {
      Audio: audioFile,
      Image: imageFile,
      Question: question,
      Answer: answerL,
      Explain: {
        script: script,
        tip: tip,
        translate: translation,
      }
    }
    console.log(data);

    // const response = await axios.post('http://192.168.1.103:3000/api/Question/uploadAudio', formData1);
    
    // await addQuestion('ListenPart1', data);
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Form</h2>
      <div className='fileContainer'>
        <label>
          Audio:
          <input type="file" accept="audio/*" onChange={handleAudioChange} />
        </label>

        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>

      <label>
        Question:
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows="4" />
      </label>

      <label>Answer:</label>
      <div>
        <label className='rlable'>
          <input type="radio" name="answer" value={0} onChange={handleAnswerChange} checked={selectedAnswer == 0} /> A
        </label>
        <label className='rlable'>
          <input type="radio" name="answer" value={1} onChange={handleAnswerChange} checked={selectedAnswer == 1} /> B
        </label>
        <label className='rlable'>
          <input type="radio" name="answer" value={2} onChange={handleAnswerChange} checked={selectedAnswer == 2} /> C
        </label>
        <label className='rlable'>
          <input type="radio" name="answer" value={3} onChange={handleAnswerChange} checked={selectedAnswer == 3} /> D
        </label>
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

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddQuestion