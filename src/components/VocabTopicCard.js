import React, { useState, useEffect } from 'react';
import "../styles/Vocab.css";
const VocabTopicCard = ({item,click})=>{
    return(
        <div style={{width:290, height:230, alignItems:'center', marginRight:15, textAlign:'center', backgroundColor:'#E8E8E8', marginTop:15, display:'block'}}>
            {(item.Image !== '-1')&&<>
            <img src={item?.Image} alt="Topic'sImg" style={{margin:'auto', width:190, marginTop:5, height:130}} />
            <h3>{'Topic: '+item?.Topic}</h3>
            <h5>{'Quantity: '+item?.VocabQuantity}</h5>
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