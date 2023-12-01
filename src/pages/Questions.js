import React, { useState,useEffect } from 'react';
import "../styles/Questions.css";
import { useNavigate } from "react-router-dom";
import User from './User'
import ListenPart1Screen from './ListenPart1Screen';
import api from '../api/Api'

import "../styles/Questions.css";
const Questions = () => {
  const navigate = useNavigate();
  const [sign, SetSign] = useState('ListenPart1')
  const [listQ, setListQ] = useState(null)
  const getquestion = async(part)=>{
    SetSign(part);
      const list = await api.getAllQuestion(part)
      setListQ(list)
    }
    useEffect(() => {
      getquestion('ListenPart1')
    }, []);
  return(
    // <button onClick={() => navigate('/Question/add')}>Add question</button>
  <div style={{display:'flex', flex:1}}>
      <div id="leftmenuinnerinner">
<h2 class="left">Listening</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => { getquestion('ListenPart1')}} className={(sign==='ListenPart1')?'BtnClick':'BtnNormal'}>ListenPart1</button></li>
        <li  ><button onClick={() => {getquestion('ListenPart2')}} className={(sign==='ListenPart2')?'BtnClick':'BtnNormal'}>ListenPart2</button></li>
        <li  ><button onClick={() => {getquestion('ListenPart3')}} className={(sign==='ListenPart3')?'BtnClick':'BtnNormal'}>ListenPart3</button></li>
        <li  ><button onClick={() => {getquestion('ListenPart4')}} className={(sign==='ListenPart4')?'BtnClick':'BtnNormal'}>ListenPart4</button></li>
    </ul>
    <h2 class="left">Reading</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => {getquestion('ReadPart1')}} className={(sign==='ReadPart1')?'BtnClick':'BtnNormal'}>ReadPart1</button></li>
        <li  ><button onClick={() => {getquestion('ReadPart2')}} className={(sign==='ReadPart2')?'BtnClick':'BtnNormal'}>ReadPart2</button></li>
        <li  ><button onClick={() => {getquestion('ReadPart3')}} className={(sign==='ReadPart3')?'BtnClick':'BtnNormal'}>ReadPart3</button></li>
    </ul>
    <h2 class="left">Speaking</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => {getquestion('SpeakPart1')}} className={(sign==='SpeakPart1')?'BtnClick':'BtnNormal'}>SpeakPart1</button></li>
        <li  ><button onClick={() => {getquestion('SpeakPart2')}} className={(sign==='SpeakPart2')?'BtnClick':'BtnNormal'}>SpeakPart2</button></li>
        <li  ><button onClick={() => {getquestion('SpeakPart3')}} className={(sign==='SpeakPart3')?'BtnClick':'BtnNormal'}>SpeakPart3</button></li>
        <li  ><button onClick={() => {getquestion('SpeakPart4')}} className={(sign==='SpeakPart4')?'BtnClick':'BtnNormal'}>SpeakPart4</button></li>
        <li  ><button onClick={() => {getquestion('SpeakPart5')}} className={(sign==='SpeakPart5')?'BtnClick':'BtnNormal'}>SpeakPart5</button></li>
    </ul>
    <h2 class="left">Writting</h2>
<ul style={{ paddingLeft:0, marginLeft:5}} className='leftbar'>
        <li  ><button onClick={() => {getquestion('WritePart1')}} className={(sign==='WritePart1')?'BtnClick':'BtnNormal'}>WritePart1</button></li>
        <li  ><button onClick={() => {getquestion('WritePart2')}} className={(sign==='WritePart2')?'BtnClick':'BtnNormal'}>WritePart2</button></li>
        <li  ><button onClick={() => {getquestion('WritePart3')}} className={(sign==='WritePart3')?'BtnClick':'BtnNormal'}>WritePart3</button></li>
    </ul>
    </div>
    <div style={{flex:1, display:'grid'}}>
      <ListenPart1Screen sign={sign} listQ={listQ} Remove={async(key,id)=>{
         alert('The question has been successfully deleted')
         const list = listQ.slice();
         list.splice(key, 1);
         setListQ(list)
         await api.deleteQuestion(sign, id);
      }}/>

    </div>
  </div>



  );
};

export default Questions;