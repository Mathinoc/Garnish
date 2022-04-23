import React from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from './../images/garnish-256px.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './../styling/Header.scss';


export default function Header({ searchSet }) {

  const nodeRef = React.useRef(null); //avoid error with CSSTransition: see line 67
  const location = useLocation()
  const navigate = useNavigate();
  let searchInput = React.createRef();
  let filterMenu = React.createRef();
  const [open, setOpen] = useState(false);

  const [vegetarianSub, setVegetarianSub] = useState(false);
  const [glutenSub, setGlutenSub] = useState(false);
  const [dairySub, setDairySub] = useState(false);

  function handleClick() {
    console.log('pathlocation', location.pathname)
    const inputField = searchInput.current.value;
    console.log('inputField', inputField);
    searchInput.current.value = ''

    if (inputField.length > 0) {
      if (location.pathname !== '/search') navigate("/search");
      searchSet.setSearchRecipe(inputField);
      searchSet.setVegetarian(vegetarianSub);
      searchSet.setGlutenFree(glutenSub);
      searchSet.setDairyFree(dairySub);
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

  const [animate, setAnimate] = useState(false);
  const handleClickkk = () => setAnimate(!animate);

  return (
    <div className="header">
      <Link to="/" id='menu'>
        <img src={logo} alt="leaf" />
        <p> Garnish</p>
      </Link>

      <div className='search-bar'>
        <button onClick={handleClick}><i className="bi bi-search"></i></button>

        <input onKeyPress={pressEnter} ref={searchInput} placeholder="Search..." />
        <div className="dropdown" >
          <button className="link" onClick={() => { setOpen(!open); console.log(open) }}><i className="bi bi-sliders"></i></button>
          <CSSTransition
            // nodeRef={nodeRef} // avoid findDOMNode is deprecated in StrictMode error
            in={open}
            ref={filterMenu}
            unmountOnExit
            timeout={500}
            classNames="menu-primary"
          >
            <div className="dropdown-menu">
              <form className="dropdown-form">
                <div>
                  <input type="checkbox" name="vegetarian" onChange={vegToggle} checked={vegetarianSub} />
                  <label>Vegetarian</label>
                </div>
                <div>
                  <input type="checkbox" name="gluten free" onChange={glutenToggle} checked={glutenSub} />
                  <label>Gluten free</label>
                </div>
                <div>
                  <input type="checkbox" name="dairy free" onChange={dairyToggle} checked={dairySub} />
                  <label>Dairy free</label>
                </div>
                <button onClick={closeDropdown}>Save</button>
              </form>
            </div>
          </CSSTransition>
        </div>

      </div >
      <nav>

        <Link to="/my-recipes">
          <Button type="button" className="btn-head btn-my-recipe">My recipes</Button>
        </Link>
        <Link to="/parse">
          <Button className="btn-head btn-parse">Parse</Button>
        </Link>
        <Link to="/logIn">
          <Button className="btn-head btn-log-in">Log in</Button>
        </Link>
      </nav>
    </div >
  )
}
