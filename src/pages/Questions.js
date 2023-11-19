import React, { useState } from 'react';
import "../styles/Questions.css";
import { useNavigate } from "react-router-dom";
const Questions = () => {
  const navigate = useNavigate();
  return(
  <button onClick={() => navigate('/Question/add')}>Add question</button>
  );
};

export default Questions;