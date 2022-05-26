import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import SearchList from './components/SearchList';
import RecipeDetail from './components/RecipeDetail';
import Footer from "./components/Footer";
import MyRecipes from "./components/myRecipes/MyRecipes";
import SavedRecipes from './components/SavedRecipes/SavedRecipes';
import { useState, useEffect } from 'react';
import { getRandomRecipess } from './services/recipeService';
// import { getRandomRecipes, getRecipeBulk } from './data';

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
    //getRandomRecipess(20)
      .then(result => {
        if (Array.isArray(result)) {
          result.map(el => {
            myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })
          setRandomListInitial({ ok: true, resultArray: result });
          console.log('affected data')
        } else {
          alert("Couldn't get the data :/")
          const message = "Sorry, we couldn't get any recipe from the database"
          setRandomListInitial({ ok: false, displayText: message });
        }
      })
      .catch(error => console.log("getRandomRecipess()", error));
  }, [])


  //! from saved data
  // const randomListInitial ={ok: true, resultArray:getRandomRecipes(20)};
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
    console.log('togglingRR')
    const newList = randomListInitial.resultArray.map(el => {
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
        if (el.favorite) {
          setMyList([...myList, recipeId])
        } else {
          setMyList(myList.filter(id => id !== recipeId))
        }
      }
      return el
    })
    //setRandomListInitial({ ...randomListInitial, resultArray: newList })
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
              <Route path="/:recipeId" element={<RecipeDetail toggleHeart={toggleHeart} myList={myList} />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/my-favorites" element={<SavedRecipes myList={myList} toggleHeart={toggleHeart} />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )

}

export default App;
