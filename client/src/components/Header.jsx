import React from 'react';
import { Link } from "react-router-dom";
import './../styling/Header.scss';
import logo from './../images/garnish-256px.png';

export default function Header() {

  let searchInput = React.createRef();

  function handleClick() {
    console.log(searchInput.current.value)
  }

  return (
    <div className="header">
        <Link to="/" id='menu'><img src={logo} alt="leaf" /><p> Garnish</p></Link>
      <div className='search-bar'>
        <button onClick={handleClick} ><i className="bi bi-search"></i></button>
        <input ref={searchInput} placeholder="Search..." />
        <button><i className="bi bi-sliders"></i></button>
      </div>
      <nav>
        <Link to="/parse"><button className="btn parse">Parse</button></Link>
        <Link to="/logIn"><button className="btn log-in">Log in</button></Link>
      </nav>
    </div>
  )
}
