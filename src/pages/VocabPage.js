import React, { useState,useEffect } from 'react';
import "../styles/Vocab.css";
import VocabForm from '../components/VocabForm';
import api from '../api/Api';
import { useNavigate, useLocation} from "react-router-dom";
function VocabPage() {
    // Example:'',
    //                 Spelling:'',
    //                 Type:'',
    //                 Vocab:'',
    //                 Translate:'',
    //                 ListenFile:'',
    const location = useLocation();
    const data = location.state;
    const [sign,setSign] = useState('')
    const [vocabL,setVocabL] = useState([])
    const [example,setExample] = useState('')
    const [spell,setSpell] = useState('')
    const [type,setType] = useState('')
    const [vocab,setVocab] = useState('')
    const [translate,setTranslate] = useState('')
    const [listenFile,setListenFile] = useState('')
    const [idVocab,setIdVocab] = useState('')

    const getListVocab=async()=>{
        const res = await api.getVocabinLesson(data.TopicId)
        setVocabL(res)
    }
    useEffect(() => {
        getListVocab()
    }, []);
    const handleComplete= async()=>{
        await api.updateTopic(data.TopicId,{VocabQuantity:vocabL.length+1})
        await api.addVocab({
                Example:example,
                Spelling:spell,
                Type:type,
                Vocab:vocab,
                Translate:translate,
                ListenFile:listenFile,
                TopicId:data.TopicId
        })
        getListVocab()
        alert('The Vocab has been successfully add')
    }
    const handleComplete1= async()=>{
        await api.updateVocab(idVocab,{
                Example:example,
                Spelling:spell,
                Type:type,
                Vocab:vocab,
                Translate:translate,
                ListenFile:listenFile,
                TopicId:data.TopicId
        })
        getListVocab()
        alert('The Vocab has been successfully update')
    }
    return (
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: 1000,height: 600 }}>
        <div style={{backgroundColor:'#E8E8E8', width:700, margin:'auto',marginTop:30, borderRadius:20}}>
                    <div className="text-input2">
                      <h3>{"Vocab: "}</h3>
                      <div style={{ width: 30 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                            if(sign!=='see')
                            setVocab(e.target.value)
                        }}
                        value={vocab}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"ListenFile: "}</h3>
                      <input
                        type="url"
                        onChange={(e) => {
                            if(sign!=='see')
                            setListenFile(e.target.value)
                        }}
                        value={listenFile}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Spelling: "}</h3>
                      <div style={{ width: 15 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                            if(sign!=='see')
                            setSpell(e.target.value)
                        }}
                        value={spell}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Type: "}</h3>
                      <div style={{ width: 45 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                            if(sign!=='see')
                            setType(e.target.value)
                        }}
                        value={type}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Example: "}</h3>
                      <div style={{ width: 25 }} />
                      <textarea
                      rows={3}
                        type="text"
                        onChange={(e) => {
                            if(sign!=='see')
                            setExample(e.target.value)
                        }}
                        value={example}
                      ></textarea>
                    </div>
                    <div className="text-input2">
                      <h3>{"Translate: "}</h3>
                      <div style={{ width: 4}} />
                      <input
                        type="text"
                        onChange={(e) => {
                            if(sign!=='see')
                            setTranslate(e.target.value)
                        }}
                        value={translate}
                        id="TR"
                      ></input>
                    </div>
                  </div>
                  {(sign==='add')&&<button style={{display:'block', margin:'auto', width:100, marginTop:10}} onClick={()=>{handleComplete()}}>Submit</button>}
                  {(sign==='edit')&&<button style={{display:'block', margin:'auto', width:100,marginTop:10}} onClick={()=>{handleComplete1()}}>Update</button>}
        </div>
        <div style={{ width: 400 }}>
          <div style={{ display: "flex" }}>
            <h3
              style={{
                marginBottom: 10,
                marginTop: 10,
                marginRight: 10,
                textAlign: "center",
              }}
            >
              List Vocab in topic {data.TopicName}
            </h3>
            <button
              onClick={() => {
               setSign('add')
               setVocab('')
               setListenFile('')
               setType('')
               setSpell('')
               setExample('')
               setTranslate('')
              }}
            >
              Add
            </button>
          </div>
          <div
            style={{ height: 600, overflow: "auto", alignItems: "flex-start" }}
          >
            {vocabL?.map((each,key) => (
                <VocabForm
                  eye={() => {
                    setSign('see')
                    setVocab(each.Vocab)
                    setListenFile(each.ListenFile)
                    setType(each.Type)
                    setSpell(each.Spelling)
                    setExample(each.Example)
                    setTranslate(each.Translate)
                  }}
                  pen={() => {
                    setSign('edit')
                    setIdVocab(each.Id)
                    setVocab(each.Vocab)
                    setListenFile(each.ListenFile)
                    setType(each.Type)
                    setSpell(each.Spelling)
                    setExample(each.Example)
                    setTranslate(each.Translate)
                  }}
                  Delete={async () => {
                    alert('The Vocab has been successfully deleted')
                    await api.updateTopic(data.TopicId,{VocabQuantity:vocabL.length-1})
                    const list = vocabL.slice();
                    list.splice(key, 1);
                    setVocabL(list)
                    await api.deleteVocab(each.Id)
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
export default VocabPage