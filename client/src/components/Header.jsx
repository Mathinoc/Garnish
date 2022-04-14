import React from 'react';
import { Link } from "react-router-dom";
import './../styling/Header.css';

export default function Header() {
  return (
    <div className="header">
      <Link to="/">Garnish</Link>
      <div className='search-bar'>
        <button>search</button>
        <input placeholder="Search..." />
        <button>filter</button>
      </div>
      <nav>
        {/* <Link to="/signUp"><button className="btn sign-up">Sign up</button></Link> */}
        <Link to="/logIn"><p className="btn log-in">Log in</p></Link>
      </nav>
    </div>
  )
}
