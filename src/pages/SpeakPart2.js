import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function SpeakPart2({item,complete,flag}) {
  const [imageFile, setImageFile] = useState(item?.Picture||null);
  const [sampleAnswer, setSampleAnswer] = useState(item?.Explain?.SampleAnswer||'');
  const [tip, setTip] = useState(item?.Explain?.Tips||'');

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    
    if(flag==='submit'){
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
    }
    else if(flag === 'fix'){
      let data = {
        Picture: imageFile,
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
      <h2>Add Question Speak part 2</h2>
      {(flag==='see')&&<>
      <div className='fileContainer'>

        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <text style={{font:12}}>or input the link:</text>
          <input type='url' onChange={(e) => setImageFile(e.target.value)} value={item.Picture}/>
        </label>
      </div>


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
      </>}

      

{(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default SpeakPart2