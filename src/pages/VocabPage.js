import React, { useState,useEffect } from 'react';
import "../styles/Vocab.css";
import VocabForm from '../components/VocabForm';
import api from '../api/Api';
import { useNavigate, useLocation} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
function VocabPage() {
    const location = useLocation();
    const data = location.state;
    const [sign,setSign] = useState('')
    const [vocabL,setVocabL] = useState([])
    const [example,setExample] = useState('')
    const [spell,setSpell] = useState('')
    const [type,setType] = useState('n')
    const [vocab,setVocab] = useState('')
    const [translate,setTranslate] = useState('')
    const [listenFile,setListenFile] = useState('')
    const [idVocab,setIdVocab] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [searchVocab, setSearchVocab] = useState('')
    const [errors, setErrors] = useState('');

    const getListVocab=async()=>{
        const res = await api.getVocabinLesson(data.TopicId)
        setVocabL(res)
    }
    useEffect(() => {
        getListVocab()
    }, []);

    function isAudioUrl(url) {
      try{
        new URL(url);
        const audioUrlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|wav)$/i;
        return audioUrlRegex.test(url.toLowerCase());
      } catch(error){
        return false;
      }
    }

    const validateData = () => {
      let errorFields = [];
      let audioError = '';
      let inputError = '';
      if(vocab == ""){
        errorFields.push("Vocabulary");
      }
      if(listenFile==null || listenFile==""){
        errorFields.push("Audio File");
      }
      if(spell == ""){
        errorFields.push("Phonetic Symbols");
      }
      if(type == ""){
        errorFields.push("Type");
      }
      if(example == ""){
        errorFields.push("Example");
      }
      if(translate == ""){
        errorFields.push("Translation");
      }
      if(errorFields.length > 0) inputError = "Please input complete information: " + errorFields.join(", ") + ". ";
      if(listenFile!=null && listenFile!="" && !isAudioUrl(listenFile)) audioError = "\nThe audio url link is not valid!"
      if(errorFields.length > 0 || !isAudioUrl(listenFile)){
        setErrors(inputError + audioError);
        return false;
      }
      else return true;
    }

     
    const handleComplete= async()=>{
      if(!validateData()) return;
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
        setErrors('')
        setModalOpen(false);
    }
    const handleComplete1= async()=>{
      if(!validateData()) return;
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
        setErrors('')
        setModalOpen(false);
    }
    return (
      <div style={{ display: "flex" }}>
        <div>
          {/* <div style={{ display: "flex" }}>
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
          <div style={{ height: 600, overflow: "auto", alignItems: "flex-start" }}>
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
          </div>  */}
          <h3 style={{
                marginBottom: 10,
                marginTop: 10,
                textAlign: "center",
              }}>
              Vocabularies in {data.TopicName}
          </h3>

          <div style={{marginTop: 20}}>
            <button type="button" class="btn btn-light" style={{ backgroundColor: '#F88C19', color: '#fff', marginLeft: 10}} 
            onClick={() => {
              setSign('add')
              setVocab('')
              setListenFile('')
              setType('')
              setSpell('')
              setExample('')
              setTranslate('')
              setModalOpen(true);
            }}>
              Add Vocabulary
            </button>
            <button type="button" class="btn btn-light" style={{ backgroundColor: '#5DA110', color: '#fff', marginLeft: 10}}>
              Search
            </button>
            <input className="customInput" style={{width: 250, height: 40, marginLeft: 10}}
                  type="text"
                  onChange={(e) => {
                    setSearchVocab(e.target.value)
                  }}
                  value={searchVocab}
                  placeholder='Enter a vocabulary'
            ></input>
          </div>

          <div style={{margin: 20}}>
          <table className="table" >
                <thead>
                    <tr className="table-secondary">
                        <th>Vocabulary</th>
                        <th>Type</th>
                        <th>Phonetic Symbols</th>
                        <th>Translation</th>
                        <th>Example</th>
                        <th>AudioFile</th>
                        <th></th>
                    </tr>
                </thead>
                {vocabL?.map((each, key) => {
                    return (
                    <tr key={each.Id}>
                        <td>{each.Vocab}</td>
                        <td>{each.Type}</td>
                        <td>{each.Spelling}</td>
                        <td>{each.Translate}</td>
                        <td>{each.Example}</td>
                        <td>{each.ListenFile}</td>
                        <td className="fit">
                            <span className="actions" style={{ display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faPen} onClick={() => {
                              setSign('edit')
                              setIdVocab(each.Id)
                              setVocab(each.Vocab)
                              setListenFile(each.ListenFile)
                              setType(each.Type)
                              setSpell(each.Spelling)
                              setExample(each.Example)
                              setTranslate(each.Translate)
                              setModalOpen(true)
                            }} 
                            color='green' className='Qicon'/>
                            <FontAwesomeIcon icon={faTrash} color='green'className='Qicon'
                            onClick={async () => {
                              const shouldDelete = window.confirm('Are you sure you want to delete this vocabulary?');
                              if (shouldDelete) {               
                                await api.updateTopic(data.TopicId,{VocabQuantity:vocabL.length-1})
                                const list = vocabL.slice();
                                list.splice(key, 1);
                                setVocabL(list)
                                await api.deleteVocab(each.Id)
                             }
                            }} />
                            </span>
                        </td>
                    </tr>
                    );
                    })}
            </table>
          </div>
        </div>
        {modalOpen && (
          <div  className="modal-container" 
          onClick={(e) => {
            if (e.target.className === "modal-container") {setModalOpen(false); setErrors('')}
          }}>
          <div style={{ width: '40%',height: '85%', backgroundColor:'#fff', borderRadius: 10, paddingLeft: 20, paddingRight: 20 }}>
            <h3 style={{marginTop: 30, textAlign: 'center'}}>{sign=='add' ? 'Add' : 'Update'} Vocabulary</h3>
            <div style={{ width:700, margin:'auto',marginTop:30, borderRadius:20}}>
            <div className="text-input2">
              <text style={{width: '80px'}}>{"Vocabulary: "}</text>
              <input className="customInput"
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
                <text style={{width: '80px'}}>{"Audio File: "}</text>
                <input className="customInput"
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
                <text style={{width: '80px'}}>{"Phonetic Symbols: "}</text>
                <input className="customInput"
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
                <text style={{width: '80px'}}>{"Type: "}</text>
              <select class="customInput" id="type"  value={type} style={{ width: 510, height: 50, marginLeft: 10}}
              onChange={(e) => {
                setType(e.target.value)
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
                      if(sign!=='see')
                      setExample(e.target.value)
                  }}
                  value={example}
                ></textarea>
              </div>
              <div className="text-input2">
                <text style={{width: '80px'}}>{"Translattion: "}</text>
                  <input className="customInput"
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
            {errors && <div className="error">{errors}</div>}
            {(sign==='add')&&<button type="button" class="btn btn-light" style={{ display:'block', margin:'auto', width:100, backgroundColor: '#F88C19', color: '#fff', marginTop: 20}} onClick={()=>{handleComplete()}}>Submit</button>}
            {(sign==='edit')&&<button type="button" class="btn btn-light" style={{ display:'block', margin:'auto', width:100, backgroundColor: '#F88C19', color: '#fff', marginTop: 20}} onClick={()=>{handleComplete1()}}>Update</button>}
            </div>
          </div>
        )}
      </div>
    );
}
export default VocabPage