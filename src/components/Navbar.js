import React, {useState} from 'react'
import Logo from "../assets/penguin.png";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-sm" style={{backgroundColor: '#121619'}}>
      <div class="container" id="topNav">
        <div style={{marginLeft: 50}}>
          <img src={Logo} alt="Avatar Logo" style={{ width: '100%', height: 80 }} />
        </div>
        <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"  ></span>
        </button>

        <div className="mx-3"> </div>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav me-auto">
          <div class="navbar-nav">
          <li className="nav-item me-4">
            <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink to="/Question" className="nav-link" aria-current="page"> Question </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink to="/Vocab" className="nav-link" aria-current="page"> Vocab </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink to="/Test" className="nav-link" aria-current="page"> Test </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink to="/Forum" className="nav-link" aria-current="page"> Forum </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink to="/User" className="nav-link" aria-current="page"> User </NavLink>
          </li>
          </div>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar