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

function App() {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [glutenFree, setGlutenFree] = useState(false);
  const [dairyFree, setDairyFree] = useState(false);

  const searchAndFilterSets = {
    setSearchRecipe,
    setVegetarian, vegetarian,
    setGlutenFree, glutenFree,
    setDairyFree,dairyFree
  }

  return (

    <div className="App">
      <BrowserRouter>
        <Header searchSet={searchAndFilterSets} />
          <div className="body-container">
            <Routes>
              <Route path="/" element={<RecipeList number={10}/>} />
              <Route path="/search" element={<SearchList searchValue={searchRecipe}/>} />
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
