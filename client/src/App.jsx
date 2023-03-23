import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import SearchList from './components/SearchList';
import RecipeDetail from './components/RecipeDetail';
import Footer from "./components/Footer";
import MyRecipes from "./components/MyRecipes";
import SavedRecipes from './components/SavedRecipes';
import { useState, useEffect } from 'react';
import { getRandomRecipes } from './services/recipeService';
// import { getMockedRandomRecipes, getRecipeBulk } from './data';

function App() {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [gluten, setGluten] = useState(false);
  const [dairy, setDairy] = useState(false);
  const [myList, setMyList] = useState(() => {
    const savedRecipeIdsJson = localStorage.getItem("myFavorites");
    const savedRecipeIds = JSON.parse(savedRecipeIdsJson);
    return savedRecipeIds || [];
  })

  const searchAndFilterSets = {
    setSearchRecipe, searchRecipe,
    setVegetarian, vegetarian,
    setGluten, gluten,
    setDairy, dairy
  }

  //! from API
  const [randomListInitial, setRandomListInitial] = useState([]);

  useEffect(() => {
    getRandomRecipes()
      .then(result => {
        if (Array.isArray(result)) {
          result.map(el => {
            myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })
          setRandomListInitial({ ok: true, resultArray: result });
        } else {
          const message = "Sorry, we couldn't get any recipe from the database"
          setRandomListInitial({ ok: false, displayText: message });
        }
      })
      .catch(error => console.log("getRandomRecipes()", error));
  }, [])


  //! from saved data
  // const randomListInitial ={ok: true, resultArray:getMockedRandomRecipes(20)};
  // randomListInitial.resultArray.map(el => {
  //   if (myList.includes(el.id)) {
  //     el["favorite"] = true;
  //   } else {
  //     el["favorite"] = false;
  //   }
  // })

  useEffect(() => {
    localStorage.setItem("myFavorites", JSON.stringify(myList))
  }, [myList])

  function toggleHeart(recipeId) {
    const newList = randomListInitial.resultArray.map(el => {
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
      }
      return el
    })
    setRandomListInitial({ ...randomListInitial, resultArray: newList })
    if (myList.includes(recipeId)) {
      setMyList(myList.filter(id => id !== recipeId))
    } else {
      setMyList([...myList, recipeId])
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Header searchSet={searchAndFilterSets} />
        <div className="body-container">
          <div className="body-sub-container" >
            <Routes>
              <Route path="/" element={<RecipeList toggleHeart={toggleHeart} randomListInitial={randomListInitial} />} />
              <Route path="/search" element={<SearchList toggleHeart={toggleHeart} myList={myList} number={20} searchSet={searchAndFilterSets} />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetail toggleHeart={toggleHeart} myList={myList} />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/my-favorites" element={<SavedRecipes myList={myList} toggleHeart={toggleHeart} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )

}

export default App;
