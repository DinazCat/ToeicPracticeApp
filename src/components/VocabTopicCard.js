import React, { useState, useEffect } from 'react';
import "../styles/Vocab.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
const VocabTopicCard = ({item,click,eyeClick, trashClick})=>{
    return(
        <>
        {(item.Image !== '-1')&&<>
        <Card className="question-item"  style={{width: 290, padding: 10, backgroundColor: '#f8f8f8'}}>
        <Card.Img variant="top" src={item?.Image} alt={"Topic Img"} 
        style={{height: 130, width:190, objectFit: 'contain', alignSelf: 'center'}}/>
        <Card.Body>
            <h4 style={{textAlign: 'center'}}>{item?.Topic}</h4>
            <h5 style={{textAlign: 'center'}}>{'Quantity: '+item?.VocabQuantity}</h5>
            <div style={{display: 'flex'}}>
            <div style={{flex:1}}/>
            <FontAwesomeIcon  icon={faEye} onClick={eyeClick} color='green'className='Qicon'/>
            <FontAwesomeIcon  icon={faTrash} onClick={trashClick}  color='green'className='Qicon'/>
            </div>
        </Card.Body>
        </Card>
        </>}
        {(item.Image === '-1')&&<>
        <div className="addBtn">
        <button type="button" class="btn btn-light" style={{backgroundColor: '#F88C19', color: '#fff'}} onClick={()=>{click()}}> Add Topic</button>
        </div>
        </>}
        </>

    )
}
export default VocabTopicCard