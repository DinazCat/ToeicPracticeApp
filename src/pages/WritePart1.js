import React, {useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AddQuestion.css";
import api from '../api/Api';
import client from '../api/client';
import axios from 'axios';
function WritePart1({item,complete,flag}) {
  const [imageFile, setImageFile] = useState(item?.Picture||null);
  const [word, setWord] = useState(item?.SugesstedWord);
  const [sampleAnswer, setSampleAnswer] = useState(item?.Explain?.SampleAnswer||'');
  const [tip, setTip] = useState(item?.Explain?.Tips||'');

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  const handleSubmit = async () => {
    
   
    if(flag==='submit'){
      let data = {
        Picture: imageFile,
        SugesstedWord:word,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
        Order:await api.countQuestion('WritePart1')
      }
      await api.addQuestion('WritePart1', data);
    }
    else if(flag==='fix'){
      let data = {
        Picture: imageFile,
        SugesstedWord:word,
        Explain: {
          SampleAnswer: sampleAnswer,
          Tips: tip,
        },
      }
      complete(data)
    }
  };

  return (
    <div className='addQuestion'>
      <h2>Add Question Write part 1</h2>
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
        Suggest word:
        <input type='text' value={item.SugesstedWord} onChange={(e) => setWord(e.target.value)}  />
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
     </>}

     {(flag==='submit')&&<button onClick={handleSubmit}>Submit</button>}
{(flag==='fix')&&<button onClick={handleSubmit}>Update</button>}
    </div>
  );
}

export default WritePart1