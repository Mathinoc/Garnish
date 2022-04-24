import React from 'react';
import './../../styling/myRecipes/MyRecipesList.css';
import { useState } from 'react';


export default function MyRecipesList({ personalRecipes, setPersonalRecipes }) {
  const [display, setDisplay] = useState({recipeTitle:'Select a recipe'});

  function recipeDetail(e, index) {

    if (e.target.tagName === 'I') {
      deleteRecipe(index);
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
    setTimeout(() => setDisplay({recipeTitle:'Select a recipe'}), 2000)
    setPersonalRecipes(list)
  }

  return (
    <div className="display-recipe-container">
      <p className="page-title2" >
        Recipe list
      </p>
      <div className="display-recipe-frame" >
        <div className="display-recipeList-container ">
          <table className="table table-sm table-hover table-responsive-sm">
            <tbody>
              <tr>
                <td scope="col">Title</td>
                <td scope="col">Date</td>
                <td scope="col">Delete</td>
              </tr>
              {personalRecipes && personalRecipes.map((el, index) => (
                <tr onClick={(e) => recipeDetail(e, index)} key={index + 'b'} >
                  <td>{el.recipeTitle}</td>
                  <td>{el.creationDate}</td>
                  <td>
                    <button className="btn-delete-recipe">
                      <i className="bi bi-trash"></i>
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
              <div className="card" >
                <div className="card-body">
                  <h5 className="card-title">{display.recipeTitle}</h5>
                  <p className="card-text">{display.story}</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item card-header">{display.ingredientList && 'Ingredients'}</li>
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
                    <li className="list-group-item card-header">{display.instructionList && 'Instructions'}</li>
                    <li className="list-group-item">
                      <ol className="ingredient-list" >
                        {display.instructionList && display.instructionList.map((el, index) => (
                          el.text !== '' &&
                          <li key={index + 'c'} >
                            {el.text}
                          </li>
                        ))}
                      </ol>
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
