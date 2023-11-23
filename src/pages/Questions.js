import React, { useState } from 'react';
import "../styles/Questions.css";
import { useNavigate } from "react-router-dom";
import User from './User'
import ListenPart1 from './ListenPart1';
import ListenPart2 from './ListenPart2';
import ListenPart3 from './ListenPart3';
import ListenPart4 from './ListenPart4';
import ReadPart1 from './ReadPart1';
import ReadPart2 from './ReadPart2';
import ReadPart3 from './ReadPart3';
import WritePart1 from './WritePart1';
import WritePart2 from './WritePart2';
import WritePart3 from './WritePart3';
import SpeakPart1 from './SpeakPart1';
import SpeakPart2 from './SpeakPart2';
import SpeakPart3 from './SpeakPart3';
import SpeakPart4 from './SpeakPart4';
import SpeakPart5 from './SpeakPart5';

import "../styles/Questions.css";
const Questions = () => {
  const navigate = useNavigate();
  const [sign, SetSign] = useState('L1')
  return(
    // <button onClick={() => navigate('/Question/add')}>Add question</button>
  <div style={{display:'flex', flex:1}}>
      <div id="leftmenuinnerinner">
<h2 class="left">Listening</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => SetSign('L1')} className={(sign=='L1')?'BtnClick':'BtnNormal'}>ListenPart1</button></li>
        <li  ><button onClick={() => SetSign('L2')} className={(sign=='L2')?'BtnClick':'BtnNormal'}>ListenPart2</button></li>
        <li  ><button onClick={() => SetSign('L3')} className={(sign=='L3')?'BtnClick':'BtnNormal'}>ListenPart3</button></li>
        <li  ><button onClick={() => SetSign('L4')} className={(sign=='L4')?'BtnClick':'BtnNormal'}>ListenPart4</button></li>
    </ul>
    <h2 class="left">Reading</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => SetSign('R1')} className={(sign=='R1')?'BtnClick':'BtnNormal'}>ReadPart1</button></li>
        <li  ><button onClick={() => SetSign('R2')} className={(sign=='R2')?'BtnClick':'BtnNormal'}>ReadPart2</button></li>
        <li  ><button onClick={() => SetSign('R3')} className={(sign=='R3')?'BtnClick':'BtnNormal'}>ReadPart3</button></li>
    </ul>
    <h2 class="left">Speaking</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => SetSign('S1')} className={(sign=='S1')?'BtnClick':'BtnNormal'}>SpeakPart1</button></li>
        <li  ><button onClick={() => SetSign('S2')} className={(sign=='S2')?'BtnClick':'BtnNormal'}>SpeakPart2</button></li>
        <li  ><button onClick={() => SetSign('S3')} className={(sign=='S3')?'BtnClick':'BtnNormal'}>SpeakPart3</button></li>
        <li  ><button onClick={() => SetSign('S4')} className={(sign=='S4')?'BtnClick':'BtnNormal'}>SpeakPart4</button></li>
        <li  ><button onClick={() => SetSign('S5')} className={(sign=='S5')?'BtnClick':'BtnNormal'}>SpeakPart5</button></li>
    </ul>
    <h2 class="left">Writting</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => SetSign('W1')} className={(sign=='W1')?'BtnClick':'BtnNormal'}>WritePart1</button></li>
        <li  ><button onClick={() => SetSign('W2')} className={(sign=='W2')?'BtnClick':'BtnNormal'}>WritePart2</button></li>
        <li  ><button onClick={() => SetSign('W3')} className={(sign=='W3')?'BtnClick':'BtnNormal'}>WritePart3</button></li>
    </ul>
    </div>
    <div style={{flex:1, display:'grid'}}>
      {(sign=='L1')&&<ListenPart1 flag={'Practice'}/>}
      {(sign=='L2')&&<ListenPart2 flag={'Practice'}/>}
      {(sign=='L3')&&<ListenPart3 flag={'Practice'}/>}
      {(sign=='L4')&&<ListenPart4 flag={'Practice'}/>}
      {(sign=='R1')&&<ReadPart1 flag={'Practice'}/>}
      {(sign=='R2')&&<ReadPart2 flag={'Practice'}/>}
      {(sign=='R3')&&<ReadPart3 flag={'Practice'}/>}
      {(sign=='W1')&&<WritePart1 />}
      {(sign=='W2')&&<WritePart2 />}
      {(sign=='W3')&&<WritePart3 />}
      {(sign=='S1')&&<SpeakPart1 />}
      {(sign=='S2')&&<SpeakPart2 />}
      {(sign=='S3')&&<SpeakPart3 />}
      {(sign=='S4')&&<SpeakPart4 />}
      {(sign=='S5')&&<SpeakPart5 />}
    </div>
  </div>



  );
};

export default Questions;