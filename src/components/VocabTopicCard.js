import React, { useState, useEffect } from 'react';
import "../styles/Vocab.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
const VocabTopicCard = ({item,click,eyeClick, trashClick})=>{
    return(
        <div style={{width:290, height:250, alignItems:'center', marginRight:15, textAlign:'center', backgroundColor:'#E8E8E8', marginTop:15, display:'block'}}>
            {(item.Image !== '-1')&&<>
            <img src={item?.Image} alt="Topic'sImg" style={{margin:'auto', width:190, marginTop:5, height:130}} />
            <h3>{'Topic: '+item?.Topic}</h3>
            <h5>{'Quantity: '+item?.VocabQuantity}</h5>
            <div style={{display:'flex'}}>
                <div style={{flex:1}}/>
            <FontAwesomeIcon icon={faEye} onClick={eyeClick} color='green' className='Qicon'/>
            <FontAwesomeIcon icon={faTrash} onClick={trashClick}  color='green'className='Qicon'/>
            </div>
            </>}
            {(item.Image === '-1')&&<>
            <div className="addBtn">
            <button onClick={()=>{click()}}> add </button>
            </div>
            </>}
        </div>
    )
}
export default VocabTopicCard