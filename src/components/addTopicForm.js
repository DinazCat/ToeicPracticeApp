import React, { useState, useEffect } from "react";
import "../styles/Vocab.css";

const AddTopicForm = ({complete, closeModal}) => {
  const [imageFile, setImageFile] = useState(null);
  const [topic, setTopic] = useState('');
  const [qty, setQty] = useState(null);
  const [flag,SetFlag] = useState('1');
  const [vocabs,SetVocabs] = useState([]);
  const [errors, setErrors] = useState('');

  function isImageUrl(url) {
    try{
      new URL(url);
      const imageUrlRegex = /^(https?:\/\/)/;
      return imageUrlRegex.test(url.toLowerCase());
    }catch(error){
      return false;
    }
  }
  const validateData = () => {
    let errorFields = [];
    let imgError = '';
    let inputError = '';
    let qtyError = '';
    if(imageFile=="" || imageFile==null){
      errorFields.push("Image File");
    }
    if(topic == ''){
      errorFields.push("Topic");
    }
    if(qty==null || qty==''){
      errorFields.push("Quantity");
    }
    if(imageFile!="" && imageFile!=null && !isImageUrl(imageFile)) imgError = "\nThe image url link is not valid!";
    if(qty != "" && qty != null && qty < 0) qtyError = "\nThe quantity must be greater than 0!"
    if(errorFields.length > 0) inputError = "Please input complete information: " + errorFields.join(", ") + ". ";
    if(errorFields.length > 0 || !isImageUrl(imageFile)){
      setErrors(inputError + imgError + qtyError);
      return false;
    }
    else return true;
  }
  const handleNext=()=>{
    if(!validateData()) return;

    let list = []
    for(let i = 0; i < qty; i++){
        list.push({
                Example:'',
                Spelling:'',
                Type:'n',
                Vocab:'',
                Translate:'',
                ListenFile:'',
            })
    }
    SetVocabs(list)
    SetFlag('2')
    setErrors('')
  }

  function isAudioUrl(url) {
    try{
      new URL(url);
      const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
      return audioUrlRegex.test(url.toLowerCase());
    } catch(error){
      return false;
    }
  }

  const validateData2 = () => {
    let audioError = '';
    let inputError = '';
    const hasEmptyInput = vocabs.some(item => item.Vocab == '' || item.ListenFile == '' || item.Spelling == '' || item.Type == '' || item.Translate == '' || item.Example == '');
    const hasInvalidAudio = vocabs.some(item => !isAudioUrl(item.ListenFile))
    if(hasEmptyInput) inputError = "Please input complete information: Vocabulary, Audio File, Phonetic Symbols, Type, Example, Translation. ";
    if(hasInvalidAudio) audioError = "\nThe audio url link is not valid!"
    if(hasEmptyInput){
      setErrors(inputError + audioError);
      return false;
    }
    else return true;
  }
  const handleComplete=()=>{
    if(!validateData2()) return;
    const data={
        image:imageFile,
        topic: topic,
        qty:qty,
        vocabs:vocabs
    }
    setErrors('');
    complete(data)
  }
  return (
    <div  className="modal-container" 
    onClick={(e) => {
      if (e.target.className === "modal-container") {setErrors(''); closeModal();}
    }}>
      <div
      style={{
        width: '45%',
        height: '90%',
        borderRadius: 10,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        margin: "auto",
        marginTop: 15, 
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
      }}>
        <h2 style={{textAlign: 'center', marginTop: 20}}>Add Topic</h2>
        {(flag=='1')&&<>
         <div className="text-input">
         <text style={{width: '80px'}}>Image:</text>
         <input className="customInput"
           type="url"
           onChange={(e) => setImageFile(e.target.value)}
           value={imageFile}
           placeholder="Enter an image url"
           required
         />
       </div>
       {imageFile && (
         <img
           src={imageFile}
           alt="Topic Img"
           style={{ margin: 'auto', width: 190, marginTop: 5, height: 130, display:'block', objectFit: 'contain' }}
         />
       )}
       <div className="text-input">
         <text style={{width: '80px'}}>{"Topic: "}</text>
         <input className="customInput"
           type="text"
           onChange={(e) => {
             setTopic(e.target.value);
           }}
           value={topic}
           placeholder="Enter topic name"
           required
        ></input>
       </div>
       <div className="text-input">
         <text style={{width: '80px'}}>{"Quantity: "}</text>
         <input className="customInput"
           type="number"
           onChange={(e) => {
             setQty(e.target.value);
           }}
           value={qty}
           placeholder="Enter number of vocabularies in this topic"
           required
         ></input>
       </div>
       <br />
        </>}
         {(flag=='2')&&<div style={{ overflow: 'auto', scrollbarWidth: 'thin' }}>
         {
            vocabs.map((each,key)=>{
                return (
                  <div className="vocab-form" style={{ marginTop: 5, padding: 10, marginBottom: 10 }}>
                    <h4 style={{marginLeft:10}}>{key+1}/</h4>
                    <div className="text-input2">
                      <text style={{width: '80px'}}>{"Vocabulary: "}</text>
                      <input className="customInput"
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
                      <text style={{width: '80px'}}>{"Audio File: "}</text>
                      <input className="customInput"
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
                      <text style={{width: '80px'}}>{"Phonetic Symbols: "}</text>
                      <input className="customInput"
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
                      <text style={{width: '80px'}}>{"Type: "}</text>
                    <select class="customInput" id="type"  name="chiNhanh" style={{ width: 510, height: 50, marginLeft: 10}}
                      onChange={(e) => {
                        let list = vocabs.slice()
                        list[key].Type = e.target.value
                        SetVocabs(list)
                    }}>
                      <option value="n">n</option>
                      <option value="v">v</option>
                      <option value="adj">adj</option>
                      <option value="adv">adv</option>
                      <option value="prep">prep</option>
                      <option value="conj">conj</option>
                    </select>
                    </div>
                    <div className="text-input2">
                      <text style={{width: '110px'}}>{"Example: "}</text>
                      <textarea className="customInput"
                        rows={2}
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
                      <text style={{width: '80px'}}>{"Translation: "}</text>
                      <input className="customInput"
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

      {errors && <div className="error">{errors}</div>}
      {(flag==='1')&&<button type="button" class="btn btn-light" style={{display:'block', margin:'auto', width:100, backgroundColor: '#F88C19', color: '#fff', marginTop: 10}} onClick={()=>{handleNext()}}>Next</button>}
      {(flag==='2')&&<button type="button" class="btn btn-light" style={{ backgroundColor: '#F88C19', color: '#fff', width: 100, marginTop: 10, marginLeft: 10}} onClick={()=>{handleComplete()}}>Complete</button>}
    </div>
  </div>
  );
};
export default AddTopicForm;
