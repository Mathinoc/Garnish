import React from 'react';
import './../styling/Footer.scss';
import spoon from './../images/spoonacular-logo.svg';
import { scrollToTop } from '../utils/scrollToTop';
import { Link, useMatch, useResolvedPath, useLocation } from "react-router-dom";


function ActivePath (path) {
  let resolved = useResolvedPath(path);
  return useMatch({ path: resolved.pathname, end: true });
}

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <button className="scroll-top" onClick={scrollToTop}>
          <i className="bi bi-arrow-up"></i>
        </button>
        <div className="footer-container">
          <div className="spoonacular">
            <img src={spoon} alt="Spoonacular icon" />
            <p>recipes from <a href="https://spoonacular.com/food-api" target="_blank" rel="noreferrer">spoonacular API</a></p>
          </div>
        </div>
      </div>
      <nav className='mobile-nav-bar'>
        <Link to="/" className={`${ActivePath('/') && 'active-tab'}`} >
          <i className="bi bi-house"></i>
        </Link>
        <Link to="/my-favorites" className={`${ActivePath('/my-favorites') && 'active-tab'}`}>
          <i className="bi bi-heart"></i>
        </Link>
        <Link to="/my-recipes" className={`${ActivePath('/my-recipes') && 'active-tab'}`}>
          <i className="bi bi-archive"></i>
        </Link>
      </nav>
    </>
  )
}
