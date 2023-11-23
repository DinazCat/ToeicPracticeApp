import React, { useState, useEffect } from "react";
import "../styles/Vocab.css";
const AddTopicForm = ({complete}) => {
  const [imageFile, setImageFile] = useState(null);
  const [topic, setTopic] = useState(null);
  const [qty, setQty] = useState(0);
  const [flag,SetFlag] = useState('1');
  const [vocabs,SetVocabs] = useState([]);
  const handleNext=()=>{
    if(qty!=null && qty>0){
        let list = []
        for(let i = 0; i < qty; i++){
            list.push({
                    Example:'',
                    Spelling:'',
                    Type:'',
                    Vocab:'',
                    Translate:'',
                    ListenFile:'',
                })
        }
        SetVocabs(list)
        SetFlag('2')
    }
  }
  const handleComplete=()=>{
    const data={
        image:imageFile,
        topic: topic,
        qty:qty,
        vocabs:vocabs
    }
    complete(data)
  }
  return (
    <div
      style={{
        width: 800,
        height: 600,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: "auto",
        marginTop: 15,
        // backgroundImage: `url(${'https://tse4.mm.bing.net/th?id=OIP.L29j-ctxEOVMkphQUD_eLQHaE7&pid=Api&P=0&h=220'})`      
      }}
    >
        {(flag=='1')&&<>
         <div className="text-input">
         <h3>Topic Image:</h3>
         <input
           type="url"
           onChange={(e) => setImageFile(e.target.value)}
           value={imageFile}
           id="TR"
         />
       </div>
       {imageFile && (
         <img
           src={imageFile}
           alt="Topic'sImg"
           style={{ margin: 'auto', width: 190, marginTop: 5, height: 130, display:'block' }}
         />
       )}
       <div className="text-input">
         <h3>{"Topic: "}</h3>
         <div style={{width:60}}/>
         <input
           type="text"
           onChange={(e) => {
             setTopic(e.target.value);
           }}
           value={topic}
           id="TR"
         ></input>
       </div>
       <div className="text-input">
         <h3>{"Quantity: "}</h3>
         <div style={{width:30}}/>
         <input
           type="number"
           onChange={(e) => {
             setQty(e.target.value);
           }}
           value={qty}
           id="TR"
         ></input>
       </div>
       <br />
        </>}
         {(flag=='2')&&<div style={{   overflow:'auto', height:550}}>
         {
            vocabs.map((each,key)=>{
                return (
                  <div style={{ marginTop: 5,backgroundColor:'#E8E8E8' }}>
                    <h3 style={{marginLeft:10}}>{key+1}/</h3>
                    <div className="text-input2">
                      <h3>{"Vocab: "}</h3>
                      <div style={{ width: 30 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                          let list = vocabs.slice()
                          list[key].Vocab = e.target.value
                          SetVocabs(list)
                        }}
                        value={each.Vocab}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"ListenFile: "}</h3>
                      <input
                        type="url"
                        onChange={(e) => {
                            let list = vocabs.slice()
                            list[key].ListenFile = e.target.value
                            SetVocabs(list)
                        }}
                        value={each.ListenFile}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Spelling: "}</h3>
                      <div style={{ width: 15 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                            let list = vocabs.slice()
                            list[key].Spelling = e.target.value
                            SetVocabs(list)
                        }}
                        value={each.Spelling}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Type: "}</h3>
                      <div style={{ width: 45 }} />
                      <input
                        type="text"
                        onChange={(e) => {
                            let list = vocabs.slice()
                            list[key].Type = e.target.value
                            SetVocabs(list)
                        }}
                        value={each.Type}
                        id="TR"
                      ></input>
                    </div>
                    <div className="text-input2">
                      <h3>{"Example: "}</h3>
                      <div style={{ width: 16 }} />
                      <textarea
                      rows={3}
                        type="text"
                        onChange={(e) => {
                            let list = vocabs.slice()
                            list[key].Example = e.target.value
                            SetVocabs(list)
                        }}
                        value={each.Example}
                      ></textarea>
                    </div>
                    <div className="text-input2">
                      <h3>{"Translate: "}</h3>
                      <div style={{ width: 4}} />
                      <input
                        type="text"
                        onChange={(e) => {
                            let list = vocabs.slice()
                            list[key].Translate = e.target.value
                            SetVocabs(list)
                        }}
                        value={each.Translate}
                        id="TR"
                      ></input>
                    </div>
                  </div>
                );
            })
         }
        </div>}
     
      {(flag==='1')&&<button style={{display:'block', margin:'auto', width:100}} onClick={()=>{handleNext()}}>Next</button>}
      {(flag==='2')&&<button style={{display:'block', margin:'auto', width:100}} onClick={()=>{handleComplete()}}>Complete</button>}
    </div>
  );
};
export default AddTopicForm;
