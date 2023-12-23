import React, { useState,useEffect } from 'react';
import "../styles/Vocab.css";
import L1Form from '../components/L1Form';
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
      <div class="container">

          <div style={{alignItems: 'center'}}>
            <text style={{fontSize: 20, marginRight: 20, marginLeft: 10}}><span style={{fontWeight: 'bold'}}>
              Total: </span>{listQ && listQ.length}
              </text>
            <button type="button" class="btn btn-light" style={{backgroundColor: '#F88C19', color: '#fff'}}
              onClick={() => {
                navigate("/QuestionPage", {
                  state: { sign: sign, flag:'submit'},
                });
              }}
            >
              Add Question
            </button>
          </div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 g-4">
            {listQ?.map((each, key) => (
              <div className="col col-sm-5 col-md-4" key={key}>
                <L1Form
                  eye={() => {
                    setFlag("see");
                    setData(each);
                    setOldSign(sign);
                    navigate("/QuestionPage", {
                      state: { sign: sign, item: each, flag: 'see', index: key},
                    });
                  }}
                  pen={() => {
                    navigate("/QuestionPage", {
                      state: { sign: sign, item: each, flag: 'fix', index: key},
                    });
                  }}
                  Delete={() => {
                    Remove(key, each.Id);
                  }}
                  item={each}
                />
              </div>
            ))}
          </div>  
      </div>
    );
}
export default ListenPart1Screen