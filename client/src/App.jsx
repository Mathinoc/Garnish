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
  const [gluten, setGlutenFree] = useState(false);
  const [dairy, setDairyFree] = useState(false);

  const searchAndFilterSets = {
    setSearchRecipe, searchRecipe,
    setVegetarian, vegetarian,
    setGlutenFree, gluten,
    setDairyFree,dairy
  }

  return (

    <div className="App">
      <BrowserRouter>
        <Header searchSet={searchAndFilterSets} />
          <div className="body-container">
            <Routes>
              <Route path="/" element={<RecipeList number={10}/>} />
              <Route path="/search" element={<SearchList number={10} searchSet={searchAndFilterSets}/>} />
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
