import React, { useState,useEffect } from 'react';
import "../styles/Vocab.css";
import L1Form from '../components/L1Form';
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
import api from '../api/Api';
import { useNavigate } from "react-router-dom";
function ListenPart1Screen({sign,listQ,Remove}) {
    const navigate = useNavigate();
    // const [listenP1, setListenP1] = useState(null)
    const [flag, setFlag] = useState('-1')
    const [data, setData] = useState({})
    const [oldSign, setOldSign] = useState(null)
    // const getquestion = async()=>{
    //     const list = await api.getAllQuestion(sign)
    //     setListenP1(list)
    //   }
    //   useEffect(() => {
    // getquestion()
    //   }, []);
    return (
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 1000 }}>
          {(sign==='ListenPart1')&&<ListenPart1 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ListenPart2')&&<ListenPart2 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ListenPart3')&&<ListenPart3 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ListenPart4')&&<ListenPart4 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ReadPart1')&&<ReadPart1 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ReadPart2')&&<ReadPart2 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='ReadPart3')&&<ReadPart3 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='WritePart1')&&<WritePart1 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='WritePart2')&&<WritePart2 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='WritePart3')&&<WritePart3 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='SpeakPart1')&&<SpeakPart1 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='SpeakPart2')&&<SpeakPart2 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='SpeakPart3')&&<SpeakPart3 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='SpeakPart4')&&<SpeakPart4 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
          {(sign==='SpeakPart5')&&<SpeakPart5 flag={(oldSign==sign)?flag:'-1'} item={(oldSign==sign)?data:null} />}
        </div>
        <div style={{ width: 350 }}>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                marginBottom: 10,
                marginTop: 10,
                marginRight: 10,
                textAlign: "center",
              }}
            >
              List question
            </h3>
            <button
              onClick={() => {
                navigate("/QuestionPage", {
                  state: { sign: sign, flag:'submit'},
                });
              }}
            >
              Add
            </button>
          </div>
          <div
            style={{ height: 900, overflow: "auto", alignItems: "flex-start" }}
          >
            {listQ?.map((each,key) => (
                <L1Form
                  eye={() => {
                    setFlag("see");
                    setData(each);
                    setOldSign(sign);
                  }}
                  pen={() => {
                    navigate("/QuestionPage", {
                      state: { sign: sign, item: each, flag:'fix' },
                    });
                  }}
                  Delete={ () => {
                   Remove(key,each.Id)
                  }}
                  item={each}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
}
export default ListenPart1Screen