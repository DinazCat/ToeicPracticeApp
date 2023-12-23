import React, { useState,useEffect } from 'react';
import "../styles/Questions.css";
import { NavLink, useLocation, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import User from './User'
import ListenPart1Screen from './ListenPart1Screen';
import api from '../api/Api'
import { BiHeadphone, BiBook, BiPencil, BiMicrophone } from 'react-icons/bi';
import NotificationModal from '../components/NotificationModal';
import "../styles/Questions.css";

const Questions = () => {
  const { pathname } = useLocation();
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
    <div className='container-fluid d-flex'>
      <div className='row'>
        <div className='col-auto bg-light d-flex flex-column justify-content-between min-vh-100'>
          <div className='mt-2'>
            <ul class="nav nav-pills flex-column" id="parentM">
              <li class="nav-item my-1">
                <a href='#submenu' class="nav-link text-black" data-bs-toggle='collapse' aria-current='page' 
                style={{fontSize: '20px', fontWeight: '600'}}>
                  <BiHeadphone size={32} className="mr-2" style={{marginRight: 10}} />
                  <span className="ms-2 d-none d-sm-inline">Listening</span>
                  <span class="bi bi-caret-down-fill ms-3"></span>
                </a>
                <ul class="nav collapse ms-2 flex-column show" id='submenu' data-bs-parent="#parrentM">
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start" 
                    onClick={() => { getquestion('ListenPart1')}} 
                    style={{backgroundColor: sign==='ListenPart1' && '#64BB15', color: sign==='ListenPart1' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Listening</span> Part 1
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ListenPart2')}} 
                    style={{backgroundColor: sign==='ListenPart2' && '#64BB15', color: sign==='ListenPart2' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Listening</span> Part 2
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ListenPart3')}} 
                    style={{backgroundColor: sign==='ListenPart3' && '#64BB15', color: sign==='ListenPart3' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Listening</span> Part 3
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ListenPart4')}} 
                    style={{backgroundColor: sign==='ListenPart4' && '#64BB15', color: sign==='ListenPart4' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Listening</span> Part 4
                    </button>
                  </li>
                </ul>
              </li>          
            </ul>

            <ul class="nav nav-pills flex-column" id="parentM1">
              <li class="nav-item my-1">
                <a href='#submenu1' class="nav-link text-black" data-bs-toggle='collapse' aria-current='page' 
                style={{fontSize: '20px', fontWeight: '600'}}>
                  <BiBook size={32} className="mr-3" style={{marginRight: 10}} />
                  <span className="ms-2 d-none d-sm-inline">Reading</span>
                  <span class="bi bi-caret-down-fill ms-4"></span>
                </a>
                <ul class="nav collapse ms-2 flex-column" id='submenu1' data-bs-parent="#parrentM1">
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ReadPart1')}} 
                    style={{backgroundColor: sign==='ReadPart1' && '#64BB15', color: sign==='ReadPart1' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Reading</span> Part 1
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ReadPart2')}} 
                    style={{backgroundColor: sign==='ReadPart2' && '#64BB15', color: sign==='ReadPart2' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Reading</span> Part 2
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('ReadPart3')}} 
                    style={{backgroundColor: sign==='ReadPart3' && '#64BB15', color: sign==='ReadPart3' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Reading</span> Part 3
                    </button>
                  </li>
                </ul>
              </li>          
            </ul>

            <ul class="nav nav-pills flex-column" id="parentM2">
              <li class="nav-item my-1">
                <a href='#submenu2' class="nav-link text-black" data-bs-toggle='collapse' aria-current='page' 
                style={{fontSize: '20px', fontWeight: '600'}}>
                  <BiMicrophone size={32} className="mr-2" style={{marginRight: 10}} />
                  <span className="ms-2 d-none d-sm-inline">Speaking</span>
                  <span class="bi bi-caret-down-fill ms-3"></span>
                </a>
                <ul class="nav collapse ms-2 flex-column" id='submenu2' data-bs-parent="#parrentM2">
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('SpeakPart1')}} 
                    style={{backgroundColor: sign==='SpeakPart1' && '#64BB15', color: sign==='SpeakPart1' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Speaking</span> Part 1
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('SpeakPart2')}} 
                    style={{backgroundColor: sign==='SpeakPart2' && '#64BB15', color: sign==='SpeakPart2' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Speaking</span> Part 2
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('SpeakPart3')}} 
                    style={{backgroundColor: sign==='SpeakPart3' && '#64BB15', color: sign==='SpeakPart3' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Speaking</span> Part 3
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('SpeakPart4')}} 
                    style={{backgroundColor: sign==='SpeakPart4' && '#64BB15', color: sign==='SpeakPart4' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Speaking</span> Part 4
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('SpeakPart5')}} 
                    style={{backgroundColor: sign==='SpeakPart5' && '#64BB15', color: sign==='SpeakPart5' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Speaking</span> Part 5
                    </button>
                  </li>
                </ul>
              </li>          
            </ul>

            <ul class="nav nav-pills flex-column" id="parentM3">
              <li class="nav-item my-1">
                <a href='#submenu3' class="nav-link text-black" data-bs-toggle='collapse' aria-current='page' 
                style={{fontSize: '20px', fontWeight: '600'}}>
                  <BiPencil size={32} className="mr-2" style={{marginRight: 10}} />
                  <span className="ms-2 d-none d-sm-inline">Writing</span>
                  <span class="bi bi-caret-down-fill ms-3"></span>
                </a>
                <ul class="nav collapse ms-2 flex-column" id='submenu3' data-bs-parent="#parrentM3">
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('WritePart1')}} 
                    style={{backgroundColor: sign==='WritePart1' && '#64BB15', color: sign==='WritePart1' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Writing</span> Part 1
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('WritePart2')}} 
                    style={{backgroundColor: sign==='WritePart2' && '#64BB15', color: sign==='WritePart2' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Writing</span> Part 2
                    </button>
                  </li>
                  <li class="nav-item d-flex">
                    <button type="button" class="btn btn-light w-100 text-start"
                    onClick={() => { getquestion('WritePart3')}} 
                    style={{backgroundColor: sign==='WritePart3' && '#64BB15', color: sign==='WritePart3' && '#fff', fontWeight: '600'}}>
                      <span className="d-none d-sm-inline">Writing</span> Part 3
                    </button>
                  </li>
                </ul>
              </li>          
            </ul>
          </div>
        </div>
      </div>
      <div className="col py-3" style={{ overflowX: "auto" }}>
      <ListenPart1Screen sign={sign} listQ={listQ} Remove={async(key,id)=>{
         const shouldDelete = window.confirm('Are you sure you want to delete this question?');
         if (shouldDelete) {
          const list = listQ.slice();
          list.splice(key, 1);
          setListQ(list)
          await api.deleteQuestion(sign, id);
         } 
      }}/>
    </div>
    </div>
  );
};

export default Questions;