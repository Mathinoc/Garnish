import React from 'react';
import { Link } from "react-router-dom";
import './../styling/Header.scss';
import logo from './../images/garnish-256px.png';
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';


export default function Header({ searchSet }) {

  const navigate = useNavigate();
  let searchInput = React.createRef();
  const [open, setOpen] = useState(false)


  function updateSearchVariable() {
    const inputField = searchInput.current.value;
    console.log('inputField', inputField);
    searchSet.setSearchRecipe(inputField);
  }

  function pressEnter(event) {
    if (event.key === 'Enter') {
      updateSearchVariable();
      console.log('event', event.key)
      navigate("/search");
    }
  }

  function vegToggle(e) {
    searchSet.setVegetarian(!searchSet.vegetarian);
  }
  function glutenToggle(e) {
    searchSet.setGlutenFree(!searchSet.glutenFree);
  }
  function dairyToggle(e) {
    searchSet.setDairyFree(!searchSet.dairyFree);
  }
  function handleSubmit() {
    setOpen(false)
  }


  return (
    <div className="header">
      <Link to="/" id='menu'><img src={logo} alt="leaf" /><p> Garnish</p></Link>
      
      <div className='search-bar'>

        <Link to="/search"><button onClick={updateSearchVariable}><i className="bi bi-search"></i></button></Link>

        <input onKeyPress={pressEnter} ref={searchInput} placeholder="Search..." />

        <div className="dropdown">
          <button className="link" onClick={() => { setOpen(!open); console.log(open) }}><i className="bi bi-sliders"></i></button>
          <CSSTransition
            in={open === true}
            unmountOnExit
            timeout={500}
            classNames="menu-primary"
          >
            <div className="dropdown-menu">
              <form className="dropdown-form" onSubmit={handleSubmit}>
                <label>Vegetarian</label>
                <input type="checkbox" name="vegetarian" onChange={vegToggle} checked={searchSet.vegetarian} />
                <label>Gluten free</label>
                <input type="checkbox" name="gluten free" onChange={glutenToggle} checked={searchSet.glutenFree} />
                <label>Dairy free</label>
                <input type="checkbox" name="dairy free" onChange={dairyToggle} checked={searchSet.dairyFree} />
                <button type="submit">Save</button>
              </form>
            </div>
          </CSSTransition>
        </div>

      </div>
      <nav>
        <Link to="/parse"><button className="btn parse">Parse</button></Link>
        <Link to="/logIn"><button className="btn log-in">Log in</button></Link>
      </nav>
    </div>
  )
}
