import './App.css';
//import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import LogIn from './components/LogIn';
import RecipeDetail from './components/RecipeDetail';
import ParsePage from './components/ParsePage';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<RecipeList number={10}/>} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/:recipeId" element={<RecipeDetail />} />
            <Route path="/parse" element={<ParsePage />} />
          </Routes>
        {/* <Outlet /> */}

      </BrowserRouter>
    </div>
    
    

  );
}

export default App;
