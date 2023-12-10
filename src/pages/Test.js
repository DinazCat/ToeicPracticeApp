import React, { useState, useEffect } from 'react';
import "../styles/Test.css";
import CreateTest from './CreateTest';
import TestItem from '../components/TestItem';
import { useNavigate } from "react-router-dom";
import api from '../api/Api';

function Test() {
  const [sign, SetSign] = useState('2')
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const getTests = async() => {
    const list = await api.getAllTest();
    setTests(list);
  }

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{width:150,}}>
        <ul style={{ paddingLeft: 0, marginLeft: 5 }} className="leftbar">
          <li>
            <button
              onClick={() => SetSign("2")}
              className={sign == "2" ? "BtnClick" : "BtnNormal"}
            >
              Tests
            </button>
          </li>
          <li>
            <button
              onClick={() => SetSign("1")}
              className={sign == "1" ? "BtnClick" : "BtnNormal"}
            >
              Create New
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, display: "grid" }}>
      {(sign=='1')&&<CreateTest/>}
      {(sign=='2') && (
        <div>
      <div className="grid-container">
        {
          tests?.map((each,key)=>{
            return(
              <TestItem item={each}
              trashClick={async () => {        
                const shouldDelete = window.confirm('Are you sure you want to delete this test?'); 
                if(shouldDelete){
                  const list = tests.slice();
                  list.splice(key, 1);
                  setTests(list);
                  //await api.deleteTest(each.Id);
                }
              }}
              penClick={()=>{
                navigate(`/Test/${each.Id}`,{
                  state: { item: each, flag: 'fix' },
                });
              }}
              eyeClick={()=>{
                navigate(`/Test/${each.Id}`,{
                  state: { item: each, flag: 'see' },
                });
              }}
              />
            )
          })
        }
      </div>
     </div>
      )}
      </div>
    </div>
  );
}

export default Test