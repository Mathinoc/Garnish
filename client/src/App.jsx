import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import LogIn from './components/LogIn';
import SearchList from './components/SearchList';
import RecipeDetail from './components/RecipeDetail';
import ParsePage from './components/ParsePage';
import Footer from "./components/Footer";
import MyRecipes from "./components/myRecipes/MyRecipes";
import SavedRecipes from './components/SavedRecipes/SavedRecipes';
import { useState, useEffect } from 'react';
import { getRandomRecipess } from './services/recipeService';
import { getRandomRecipes, getRecipeBulk } from './data';

function App() {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [gluten, setGlutenFree] = useState(false);
  const [dairy, setDairyFree] = useState(false);

  const searchAndFilterSets = {
    setSearchRecipe, searchRecipe,
    setVegetarian, vegetarian,
    setGlutenFree, gluten,
    setDairyFree, dairy
  }

  const [refresh, setRefresh] = useState(false);
  const [myList, setMyList] = useState(() => {
    const savedRecipeIdJson = localStorage.getItem("myFavorites");
    const savedRecipeId = JSON.parse(savedRecipeIdJson);
    return savedRecipeId || [];
  })



  //! from API
  // useEffect(() => {
  //   getRandomRecipess(100)
  //     .then(result => {
  //       if (Array.isArray(result)) {
  //         return setRandomList(result);
  //       } else {
  //         alert("Couldn't get the data :/")
  //       }
  //     })
  //     .catch(error => console.log("getRandomRecipess()", error));
  //     // setRefresh(false)
  // }, [refresh])
  //! from saved data
  // useEffect(() => {
  //   const recipeBulk = getRecipeBulk();
  //   recipeBulk.map(el => {
  //     if (myList.includes(el.id)){
  //       el["favorite"] = true;
  //     } else {
  //       el["favorite"] = false;
  //     }
  //   })
  //   setRandomList(recipeBulk)
  // }, [randomList])



  //! from API
  const [randomListInitial, setRandomListInit] = useState([]);

  useEffect(() => {
    getRandomRecipess(20)
    .then(result => {
    if (Array.isArray(result)) {
      result.map(el => {
        myList.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
      })
      setRandomListInit(result);
      //console.log('response is an array:', result)
      console.log('affected data')
    } else {
      alert("Couldn't get the data :/")
    }
  })
      .catch(error => console.log("getRandomRecipess()", error));

  }, [])


  //! from saved data
  // const randomList = getRandomRecipes(2);

  // randomList.map(el => {
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
    console.log('toggling')

    setRandomListInit(randomListInitial.map(el => {
      console.log('eleme', el)
      if (el.id === recipeId) {
        el.favorite = !el.favorite;
        if (el.favorite) {
          setMyList([...myList, recipeId])
        } else {
          setMyList(myList.filter(id => id !== recipeId))
        }
      }
      return el
    }))
    
  }


  return (

    <div className="App">
      <BrowserRouter>
        <Header searchSet={searchAndFilterSets} />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<RecipeList toggleHeart={toggleHeart} randomListInitial={randomListInitial} />} />
            <Route path="/search" element={<SearchList toggleHeart={toggleHeart} myList={myList} number={3} searchSet={searchAndFilterSets} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/:recipeId" element={<RecipeDetail toggleHeart={toggleHeart} myList={myList} />} />
            <Route path="/parse" element={<ParsePage />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/my-favorites" element={<SavedRecipes myList={myList} toggleHeart={toggleHeart}/>} />
          </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )


}

export default App;
