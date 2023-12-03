import React, { useState,useEffect } from 'react';
import "../styles/Vocab.css";
import VocabTopicCard from '../components/VocabTopicCard';
import VocabPage from './VocabPage';
import api from '../api/Api';
import AddTopicForm from '../components/addTopicForm';
import { useNavigate } from "react-router-dom";
function Vocab() {
  const [sign, SetSign] = useState('1')
  const [flag, SetFlag] = useState(false)
  const [topics, SetTopics] = useState([])
  const navigate = useNavigate();
  const getVocabLesson = async()=>{
      const list = await api.getVocabLesson()
      list.push({
        Image:'-1',
        Topic:'-1',
        VocabQuantity:'-1'
      })
      SetTopics(list)
    }
    useEffect(() => {
  getVocabLesson()
    }, []);
   const submitVocab = async(item)=>{
    const data1 = {
      Image:item.image,
      Topic:item.topic,
      VocabQuantity:item.qty
    }
    const res = await api.addVocabLesson(data1)
    let list = topics.slice()
    list[topics.length-1].Id=res
    list.push({
      Image:'-1',
      Topic:'-1',
      VocabQuantity:'-1'
    })
    SetTopics(list)
    for(let i = 0; i <item.vocabs.length;i++){
      let data2 = {...item.vocabs[i],TopicId:res}
      await api.addVocab(data2)
    }
   }
  return (
    <div style={{ display: "flex", flex: 1}}>
    {/* <div style={{width:150,}}>
      <ul style={{ paddingLeft: 0, marginLeft: 5 }} className="leftbar">
        <li>
          <button
            onClick={() => SetSign("1")}
            className={sign == "1" ? "BtnClick" : "BtnNormal"}
          >
            Add Topic
          </button>
        </li>
        <li>
          <button
            onClick={() => SetSign("2")}
            className={sign == "2" ? "BtnClick" : "BtnNormal"}
          >
            Edit Topic
          </button>
        </li>
      </ul>
    </div> */}
    <div style={{ margin:'auto'  }}>
    {(flag!==true)&&
    <div>
      <div className="grid-container">
        {
          topics?.map((each,key)=>{
            return(
              <VocabTopicCard item={each}
              click={()=>{
                if(key===topics.length-1)
                {
                  SetFlag(true)
                }
              }}
              trashClick={async ()=>{
                alert('The topic has been successfully deleted')
                const list = topics.slice();
                list.splice(key, 1);
                SetTopics(list)
                await api.deleteTopic(each.Id)
              }}
              eyeClick={()=>{
                  navigate("/VocabPage", {
                      state: { TopicId:each.Id, TopicName: each.Topic},
                    });
              }}
              />
            )
          })
        }
      </div>
     </div>
    }
    {(flag===true)&&<AddTopicForm
    complete={(data)=>{
      let list = topics.slice()
      list[topics.length-1].Image=data.image
      list[topics.length-1].Topic=data.topic
      list[topics.length-1].VocabQuantity=data.qty
      SetTopics(list)
      SetFlag(false)
      submitVocab(data)
    }}/>}
    </div>
  </div>
  )
}

export default Vocab