import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useState } from 'react';
import './../../styling/myRecipes/CreateRecipeForm.css';
import { CSSTransition } from 'react-transition-group';

export default function CreateRecipeForm({ personalRecipes, setPersonalRecipes }) {
  const [recipeTitle, setRecipeTile] = useState('')
  const [ingredientList, setIngredientList] = useState([{ ingredient: "", quantity: "", unit: "" }]);
  const [instructionList, setInstructionList] = useState([{ text: "" }]);
  const [toggle, setToggle] = useState(false);



  function addIngredient() {
    setIngredientList([...ingredientList, { ingredient: "", quantity: "", unit: "" }]);
  }
  function removeIngredient(index) {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientList(list)
  }
  function removeEmptyLine(e, index) {
    if (e.target.value !== '' && index + 1 === ingredientList.length) {
      addIngredient();
    } else if (
      ingredientList[index].ingredient === '' &&
      ingredientList[index].quantity === '' &&
      ingredientList[index].unit === '' &&
      index + 2 === ingredientList.length) {
      removeIngredient(index + 1);
    }
  }
  function changeIngredient(e, index) {
    const list = [...ingredientList];
    list[index].ingredient = e.target.value;
    setIngredientList(list);
    removeEmptyLine(e, index);
  }
  function changeQuantity(e, index) {
    const list = [...ingredientList];
    list[index].quantity = e.target.value;
    setIngredientList(list);
    removeEmptyLine(e, index);
  }
  function changeUnit(e, index) {
    const list = [...ingredientList];
    list[index].unit = e.target.value;
    setIngredientList(list);
    removeEmptyLine(e, index);
  }



  function onInstructionChange(e, index) {
    const list = [...instructionList];
    list[index].text = e.target.value;
    setInstructionList(list);
    if (index + 1 === instructionList.length && e.target.value !== '') {
      setInstructionList([...instructionList, { text: "" }]);
    } else if (index + 2 === instructionList.length && e.target.value === '') {
      const instList = [...instructionList];
      instList.pop();
      setInstructionList(instList);
    }
  }
  function removeInstruction(ind) {
    const instList = [...instructionList];
    instList.splice(ind, 1);
    setInstructionList(instList);
  }

  function titleChange (e) {
    setRecipeTile(e.target.value)
  }
  function saveRecipe() {
    localStorage.clear();
    setPersonalRecipes([...personalRecipes,{ recipeTitle, ingredientList, instructionList, creationDate: new Date().toISOString().slice(0, 10) }])
    setToggle(false)
  }



  return (
    <div className="outer-container">
      <button className={`page-title ${toggle ? '' : 'trial'}`} onClick={() => setToggle(!toggle)}>
        Add Recipe
      </button>
      <CSSTransition
        in={toggle}
        unmountOnExit
        timeout={500}
        classNames="menuPrimary"
      >
        <div className="CreateRecipe">
          <div className="input-group mb-3">
            {/* <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Title</span>
            </div> */}
            <input type="text" value={recipeTitle} onChange={(e) => titleChange(e)} className="form-control  text-center" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className='form'>
            <div className='form-filed'>
              <h3>Ingredients</h3>
              {ingredientList.map((ingredient, index) => (
                <div key={index}>
                  <div className="first-division">
                    <InputGroup className="input-group-sm mb-3">
                      <InputGroup.Text >{index + 1}</InputGroup.Text>
                      <FormControl style={{ width: '14vw' }} onChange={(e) => changeIngredient(e, index)} aria-label="ingredient" value={ingredientList[index].ingredient} placeholder="ingredient" />
                      <FormControl onChange={(e) => changeQuantity(e, index)} aria-label="quantity" value={ingredientList[index].quantity} placeholder="quantity" />
                      <FormControl onChange={(e) => changeUnit(e, index)} aria-label="unit" value={ingredientList[index].unit} placeholder="unit" />
                      {ingredientList.length > 1 &&
                        <Button variant="outline-warning"
                          onClick={() => removeIngredient(index)}
                        >
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                      }
                    </InputGroup>
                  </div>
                </div>
              ))
              }

            </div>
            <div className="output">
              <h3 className="title-minimized" >Output</h3>
              {ingredientList.map((ingredientObject, index) => (
                <ul key={index}>
                  {ingredientObject.ingredient &&
                    <li>
                      {ingredientObject.ingredient}: {ingredientObject.quantity} {ingredientObject.unit}
                    </li>
                  }
                </ul>

              ))}
            </div>
          </div>

          <div className="second-division">
            <h3>Instructions</h3>
            {instructionList.map((el, ind) => (
              <div key={ind + 'a'}>
                <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-sm">{ind + 1}</span>
                  </div>
                  <input placeholder="..." value={el.text && el.text} onChange={(e) => (onInstructionChange(e, ind))} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                  {instructionList.length > 1 &&
                    <Button variant="outline-warning"
                      onClick={() => removeInstruction(ind)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                  }
                </div>

              </div>
            ))}

          </div>



          <button type="button" onClick={saveRecipe} className="btn btn-outline-success">Save</button>
        </div>

      </CSSTransition>
    </div>
  )

}
