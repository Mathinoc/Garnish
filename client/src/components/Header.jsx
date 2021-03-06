import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from './../images/garnish-256px.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './../styling/Header.scss';
import { useRef } from 'react';


export default function Header({ searchSet }) {

  const nodeRef = React.useRef(); //avoid error with CSSTransition: see line 67
  const location = useLocation()
  const navigate = useNavigate();
  const searchInput = useRef();
  const [open, setOpen] = useState(false);

  const [vegetarianSub, setVegetarianSub] = useState(false);
  const [glutenSub, setGlutenSub] = useState(false);
  const [dairySub, setDairySub] = useState(false);

  function handleClick() {
    const inputField = searchInput.current.value;
    searchInput.current.value = ''
    if (inputField.length > 0) {
      if (location.pathname !== '/search') {
        navigate("/search");
      };
      searchSet.setSearchRecipe(inputField);
      searchSet.setVegetarian(vegetarianSub);
      searchSet.setGluten(glutenSub);
      searchSet.setDairy(dairySub);
      setOpen(false);
    }
  }

  function pressEnter(event) {
    if (event.key === 'Enter') {
      handleClick();
    }
  }

  function vegToggle(e) {
    setVegetarianSub(!vegetarianSub);
  }
  function glutenToggle(e) {
    setGlutenSub(!glutenSub);
  }
  function dairyToggle(e) {
    setDairySub(!dairySub);
  }
  function closeDropdown(e) {
    e.preventDefault();
    setOpen(false)
  }

  return (
    <div className="header">
      <Link to="/" id='menu'>
        <img src={logo} alt="leaf" />
        <p id='header-title' > Garnish</p>
      </Link>
      <div className='search-bar'>
        <button onClick={handleClick}><i className="bi bi-search"></i></button>
        <input id="main-input" onKeyPress={(e) => pressEnter(e)} ref={searchInput} placeholder="Search..." />
        <div className="dropdown" >
          <button className="link" onClick={() => setOpen(!open)}>
            <i className="bi bi-sliders"></i>
          </button>
          <CSSTransition
            nodeRef={nodeRef} // avoid findDOMNode is deprecated in StrictMode error
            in={open}
            unmountOnExit
            timeout={500}
            classNames="menu-primary"
          >
            <div className="dropdown-menu" ref={nodeRef}>
              <form className="dropdown-form" onSubmit={closeDropdown}>
                <div className="checkbox-filter" >
                  <input type="checkbox" name="vegetarian" onChange={vegToggle} checked={vegetarianSub} />
                  <label>Vegetarian</label>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" name="gluten free" onChange={glutenToggle} checked={glutenSub} />
                  <label>Gluten free</label>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" name="dairy free" onChange={dairyToggle} checked={dairySub} />
                  <label>Dairy free</label>
                </div>
                <button type='submit' className="filter-form-btn-container">
                  <div className="filter-form-inner-btn">
                    Save
                  </div>
                </button>
              </form>
            </div>
          </CSSTransition>
        </div>
      </div>
      <nav>
        <Link to="/my-recipes">
          <Button type="button" className="btn-head btn-my-recipe common-background">Recipe Box</Button>
        </Link>
        <Link to="/my-favorites">
          <Button className="btn-head btn-favorite common-background">Favorites</Button>
        </Link>
      </nav>
    </div >
  )
}
