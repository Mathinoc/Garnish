import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import LogIn from './components/LogIn';
import SearchList from './components/SearchList';
import RecipeDetail from './components/RecipeDetail';
import ParsePage from './components/ParsePage';
import Footer from "./components/Footer";
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
  const [randomList, setRandomList] = useState([]);

  //! from API
  // useEffect(() => {
  //   getRandomRecipess(50)
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
  useEffect(() => {
    setRandomList(getRecipeBulk())
  }, [randomList])

  return (

    <div className="App">
      <BrowserRouter>
        <Header searchSet={searchAndFilterSets} />
        <div className="body-container">
          <Routes>
            <Route path="/" element={<RecipeList randomList={randomList} />} />
            <Route path="/search" element={<SearchList number={10} searchSet={searchAndFilterSets} />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/:recipeId" element={<RecipeDetail />} />
            <Route path="/parse" element={<ParsePage />} />
          </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
