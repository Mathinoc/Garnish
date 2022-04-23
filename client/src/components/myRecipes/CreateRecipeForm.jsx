import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import { useState } from 'react';
import './../../styling/myRecipes/CreateRecipeForm.css'

export default function CreateRecipeForm() {
  const [ingredientList, setIngredientLIst] = useState([{ ingredient: "", quantity: "", unit: "" }])

  function addIngredient() {
    setIngredientLIst([...ingredientList, { ingredient: "", quantity: "", unit: "" }])
  }
  function removeIngredient(index) {
    const list = [...ingredientList];
    list.splice(index, 1);
    setIngredientLIst(list)
  }

  function removeEmptyLine(e, index) {
    if (e.target.value !== '' && index + 1 === ingredientList.length) {
      addIngredient();
    } else if (
      ingredientList[index].ingredient === '' &&
      ingredientList[index].quantity === '' &&
      ingredientList[index].unit === '' &&
      index + 2 === ingredientList.length) {
      removeIngredient(index + 1)
    }
  }

  function changeIngredient(e, index) {
    const list = [...ingredientList];
    list[index].ingredient = e.target.value;
    setIngredientLIst(list);
    console.log('ingredientList.length', ingredientList.length)
    console.log('index', index)

    removeEmptyLine(e, index)

  }
  function changeQuantity(e, index) {
    const list = [...ingredientList];
    list[index].quantity = e.target.value;
    setIngredientLIst(list);
    removeEmptyLine(e, index)

  }
  function changeUnit(e, index) {
    const list = [...ingredientList];
    list[index].unit = e.target.value;
    setIngredientLIst(list);
    removeEmptyLine(e, index)

  }

  return (
    <div className="CreateRecipe">

      <div className='form'>
        <div className='form-filed'>
          <h2>Ingredients list</h2>
          {ingredientList.map((ingredient, index) => (
            <div key={index}>
              <div className="first-division">
                <InputGroup className="mb-3">
                  <InputGroup.Text >{index + 1}</InputGroup.Text>
                  <FormControl style={{ width: '14vw' }} onChange={(e) => changeIngredient(e, index)} aria-label="ingredient" value={ingredientList[index].ingredient} placeholder="ingredient" />
                  <FormControl onChange={(e) => changeQuantity(e, index)} aria-label="quantity" value={ingredientList[index].quantity} placeholder="quantity" />
                  <FormControl onChange={(e) => changeUnit(e, index)} aria-label="unit" value={ingredientList[index].unit} placeholder="unit" />
                  {ingredientList.length > 1 &&
                    <Button variant="outline-warning"
                      onClick={() => removeIngredient(index)}
                    >
                      Remove
                    </Button>
                  }
                </InputGroup>
              </div>
              {/* <div className="first-division">
              {ingredientList.length - 1 === index &&
                <div className="input-group-append">
                  <button onClick={addIngredient} className="btn btn-outline-secondary" type="button">
                    Add +
                  </button>
                </div>
              }
            </div> */}
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
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
          </div>
          <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
        </div>
      </div>


    </div>
  )
}
