import React, { useState } from 'react';
import "../styles/Questions.css";
import { useNavigate, useLocation} from "react-router-dom";
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
import api from '../api/Api'
import "../styles/Questions.css";
const  QuestionPage = () => {
    const location = useLocation();
    const data = location.state;
    return(
       <div>
        {(data.flag==='submit')&&<>
        <div>
        {data.sign==='ListenPart1'&&<ListenPart1 flag={'submit'} />}
            {data.sign==='ListenPart2'&&<ListenPart2 flag={'submit'}/>}
            {data.sign==='ListenPart3'&&<ListenPart3  flag={'submit'}/>}
            {data.sign==='ListenPart4'&&<ListenPart4  flag={'submit'}/>}
            {data.sign==='ReadPart1'&&<ReadPart1 flag={'submit'}/>}
            {data.sign==='ReadPart2'&&<ReadPart2 flag={'submit'}/>}
            {data.sign==='ReadPart3'&&<ReadPart3 flag={'submit'}/>}
            {data.sign==='SpeakPart1'&&<SpeakPart1 flag={'submit'}/>}
            {data.sign==='SpeakPart2'&&<SpeakPart2 flag={'submit'}/>}
            {data.sign==='SpeakPart3'&&<SpeakPart3 flag={'submit'}/>}
            {data.sign==='SpeakPart4'&&<SpeakPart4 flag={'submit'}/>}
            {data.sign==='SpeakPart5'&&<SpeakPart5 flag={'submit'}/>}
            {data.sign==='WritePart1'&&<WritePart1 flag={'submit'}/>}
            {data.sign==='WritePart2'&&<WritePart2 flag={'submit'}/>}
            {data.sign==='WritePart3'&&<WritePart3 flag={'submit'}/>}
        </div>
        </>}
        {(data.flag==='fix')&&<>
        <div>
            {data.sign==='ListenPart1'&&<ListenPart1 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ListenPart1',data.item.Id,each)}}/>}
            {data.sign==='ListenPart2'&&<ListenPart2 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ListenPart2',data.item.Id,each)}}/>}
            {data.sign==='ListenPart3'&&<ListenPart3 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ListenPart3',data.item.Id,each)}}/>}
            {data.sign==='ListenPart4'&&<ListenPart4 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ListenPart4',data.item.Id,each)}}/>}
            {data.sign==='ReadPart1'&&<ReadPart1 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ReadPart1',data.item.Id,each)}}/>}
            {data.sign==='ReadPart2'&&<ReadPart2 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ReadPart2',data.item.Id,each)}}/>}
            {data.sign==='ReadPart3'&&<ReadPart3 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('ReadPart3',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart1'&&<SpeakPart1 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('SpeakPart1',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart2'&&<SpeakPart2 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('SpeakPart2',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart3'&&<SpeakPart3 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('SpeakPart3',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart4'&&<SpeakPart4 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('SpeakPart4',data.item.Id,each)}}/>}
            {data.sign==='SpeakPart5'&&<SpeakPart5 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('SpeakPart5',data.item.Id,each)}}/>}
            {data.sign==='WritePart1'&&<WritePart1 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('WritePart1',data.item.Id,each)}}/>}
            {data.sign==='WritePart2'&&<WritePart2 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('WritePart2',data.item.Id,each)}}/>}
            {data.sign==='WritePart3'&&<WritePart3 item={data.item} flag={'fix'} complete={async (each)=>{await api.updateQuestion('WritePart3',data.item.Id,each)}}/>}
        </div>
        </>}
       </div>
    )
}
export default QuestionPage
