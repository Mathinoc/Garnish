import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useState } from 'react';
import './../../styling/myRecipes/CreateRecipeForm.css';
import { CSSTransition } from 'react-transition-group';


export default function CreateRecipeForm({setPersonalRecipes}) {
  const [ingredientList, setIngredientList] = useState([{ ingredient: "", quantity: "", unit: "" }]);
  const [instructionList, setInstructionList] = useState([{ text: "" }]);
  const [toggle, setToggle] = useState(false);
  function toggleView() {
    setToggle(!toggle)
  }

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

  function saveRecipe() {
    console.log('yy')
    setPersonalRecipes({ingredientList,instructionList})
  }


  return (
    <div className="outer-container">
      <button className={`page-title ${toggle ? '' : 'trial'}`} onClick={toggleView}>
        Create your recipe !
      </button>
      <CSSTransition
        in={toggle}
        unmountOnExit
        timeout={500}
        classNames="menuPrimary"
      >
        <div className="CreateRecipe">
          <div className='form'>
            <div className='form-filed'>
              <h2>Ingredients list</h2>
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
              <h2>Output</h2>
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
            <h2>Instructions</h2>
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
