import React, { useState } from 'react';
import "../styles/Test.css";
import CreateTest from './CreateTest';
function Test() {
  const [sign, SetSign] = useState('1')
  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div style={{width:150,}}>
        <ul style={{ paddingLeft: 0, marginLeft: 5 }} className="leftbar">
          <li>
            <button
              onClick={() => SetSign("1")}
              className={sign == "1" ? "BtnClick" : "BtnNormal"}
            >
              Create Test
            </button>
          </li>
          <li>
            <button
              onClick={() => SetSign("2")}
              className={sign == "2" ? "BtnClick" : "BtnNormal"}
            >
              Delete Test
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, display: "grid" }}>
      {(sign=='1')&&<CreateTest/>}
      </div>
    </div>
  );
}

export default Test