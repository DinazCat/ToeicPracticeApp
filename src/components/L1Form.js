import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
const L1Form = ({item, eye, pen, Delete})=>{
    const handleClick = () => {
        // Xử lý khi người dùng click vào icon
        console.log('Icon clicked!');
      };
    return(
        <div style={{width:350, height:50,  backgroundColor:'#E8E8E8', marginTop:5, display:'flex'}}>
            <h3 style={{margin:'auto', marginLeft:5}}>{'Question '+item.Order}</h3>
            <div style={{flex:1}}/>
            <FontAwesomeIcon icon={faEye} onClick={eye} color='green' className='Qicon'/>
            <FontAwesomeIcon icon={faPen} onClick={pen} color='green'className='Qicon'/>
            <FontAwesomeIcon icon={faTrash} onClick={Delete}  color='green'className='Qicon'/>
        </div>
    )
}
export default L1Form