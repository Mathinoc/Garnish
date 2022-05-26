import React from 'react';
import './../styling/myRecipes/MyRecipesList.css';
import { useState } from 'react';


export default function MyRecipesList({ personalRecipes, setPersonalRecipes, setIndexRecipeToModify }) {
  const [display, setDisplay] = useState({ recipeTitle: 'Select a recipe' });

  function recipeAction(e, index) {
    if (e.target.id === 'trashIcon') {
      deleteRecipe(index);
    } else if (e.target.id === 'editIcon') {
      setIndexRecipeToModify(index);
    } else {
      setDisplay(personalRecipes[index]);
    }
  }

  function deleteRecipe(index) {
    const list = personalRecipes.filter((el, elIndex) => {
      if (elIndex !== index) {
        return el
      }
    });
    const message = `\'${personalRecipes[index].recipeTitle}\' has been deleted`
    setDisplay({ recipeTitle: message });
    setTimeout(() => setDisplay({ recipeTitle: 'Select a recipe' }), 2000)
    setPersonalRecipes(list)
  }

  return (
    <div className="display-recipe-container">
      <p className="page-title2" >
        My Recipes
      </p>
      <div className="display-recipe-frame" >
        <div className="display-recipeList-container ">
          <table className="table table-sm table-hover table-responsive-sm table-center-elements">
            <tbody>
              <tr>
                <td scope="col">Title</td>
                <td scope="col">Date</td>
                <td scope="col">Action</td>
              </tr>
              {personalRecipes && personalRecipes.map((el, index) => (
                <tr onClick={(e) => recipeAction(e, index)} key={index + 'b'} >
                  <td>{el.recipeTitle}</td>
                  <td>{el.creationDate}</td>
                  <td>
                    <button className="btn-recipe modify-recipe">
                      <i id='editIcon' className="bi bi-pencil icon-size-table"></i>
                    </button>
                    <button className="btn-recipe delete-recipe">
                      <i id='trashIcon' className="bi bi-trash icon-size-table"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recipe-detail-frame" >
          <div className="recipe-details">
            {display &&
              <div className="card card-frame" >
                <div className="card-body">
                  <h5 className="card-title">{display.recipeTitle}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item card-header">
                      {display.ingredientList && 'Ingredients'}
                    </li>
                    <li className="list-group-item">
                      <ul className="ingredient-list" >
                        {display.ingredientList && display.ingredientList.map((el, index) => (
                          el.ingredient !== '' &&
                          <li key={index + 'c'} >
                            {el.ingredient}: {el.quantity} {el.unit}
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item card-header">
                      {display.instructionList && 'Instructions'}
                    </li>
                    <li className="list-group-item">
                      <div className="ingredient-list" >
                        {display.instructionList && display.instructionList.map((el, index) => (
                          el.text !== '' &&
                          <div className="instruction-sub-block" key={index + 'c'}>
                            <p className="instruction-step" >Step {index + 1}</p>
                            <p  >
                              {el.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
