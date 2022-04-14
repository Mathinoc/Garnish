import './App.css';
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import RecipeList from './components/RecipeList';
import LogIn from './components/LogIn';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>

        {/* <Outlet /> */}

      </BrowserRouter>
    </div>
    
    

  );
}

export default App;
