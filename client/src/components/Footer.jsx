import React from 'react';
import './../styling/Footer.css';
import spoon from './../images/spoonacular-logo.svg'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="spoonacular">
        <img src={spoon} alt="Spoonacular icon" />
        <p>recipes from <a href="https://spoonacular.com/food-api" target="_blank">spoonacular API</a></p>
      </div>
    </div>
  )
}
