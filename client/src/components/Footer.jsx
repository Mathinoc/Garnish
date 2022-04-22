import React from 'react';
import './../styling/Footer.css';
import spoon from './../images/spoonacular-logo.svg';
import { scrollToTop } from '../utils/scrollToTop';

export default function Footer() {
  return (
    <div className="parent">
      <button className="scroll-top" onClick={scrollToTop}>
        <i class="bi bi-arrow-up"></i>
      </button>
      <div className="footer-container">
        <div className="spoonacular">
          <img src={spoon} alt="Spoonacular icon"/>
          <p>recipes from <a href="https://spoonacular.com/food-api" target="_blank">spoonacular API</a></p>
        </div>
      </div>
    </div>
  )
}
