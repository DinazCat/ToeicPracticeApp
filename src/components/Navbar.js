import React, {useState} from 'react'
import Logo from "../assets/penguin.png";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };


  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt=''/>
        <div className="hiddenLinks">
        <Link to="/"> Home </Link>
        <Link to="/Question"> Question </Link>
        <Link to="/Vocab"> Vocab </Link>
        <Link to="/Test"> Test </Link>
        <Link to="/Forum"> Forum </Link>
        <Link to="/User"> User </Link>
      </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/Question"> Question </Link>
        <Link to="/Vocab"> Vocab </Link>
        <Link to="/Test"> Test </Link>
        <Link to="/Forum"> Forum </Link>
        <Link to="/User"> User </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar