import React from 'react';
import { Link } from "react-router-dom";
import './../styling/Header.scss';
import logo from './../images/garnish-256px.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';


export default function Header({ searchSet }) {

  const navigate = useNavigate();
  let searchInput = React.createRef();
  const [open, setOpen] = useState(false);
  const condition = searchSet.searchRecipe.length > 0 || searchSet.vegetarian === true || searchSet.gluten === true || searchSet.dairy === true;

  function updateSearchVariable() {
    const inputField = searchInput.current.value;
    console.log('inputField', inputField);
    searchSet.setSearchRecipe(inputField);
  }

  function pressEnter(event) {
    if (event.key === 'Enter') {
      updateSearchVariable();
        if (condition)
        navigate("/search");
        setOpen(false)
    }
  }

  function vegToggle(e) {
    searchSet.setVegetarian(!searchSet.vegetarian);
  }
  function glutenToggle(e) {
    searchSet.setGlutenFree(!searchSet.gluten);
  }
  function dairyToggle(e) {
    searchSet.setDairyFree(!searchSet.dairy);
  }
  function handleSubmit() {
    setOpen(!open)
  }

  return (
    <div className="header">
      <Link to="/" id='menu'><img src={logo} alt="leaf" /><p> Garnish</p></Link>
      
      <div className='search-bar'>
        {condition ?
          <Link to="/search"><button onClick={updateSearchVariable}><i className="bi bi-search"></i></button></Link>
          : <button onClick={updateSearchVariable}><i className="bi bi-search"></i></button>
        }

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
              <form className="dropdown-form">
                <label>Vegetarian</label>
                <input type="checkbox" name="vegetarian" onChange={vegToggle} checked={searchSet.vegetarian} />
                <label>Gluten free</label>
                <input type="checkbox" name="gluten free" onChange={glutenToggle} checked={searchSet.gluten} />
                <label>Dairy free</label>
                <input type="checkbox" name="dairy free" onChange={dairyToggle} checked={searchSet.dairy} />
                {/* <button onClick={handleSubmit}>Save</button> */}
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
