import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';
import { Link } from "react-router-dom";
import RecipeView from './RecipeView';
import { scrollToTop } from '../utils/scrollToTop';
import animationSearch from './../gifs/searching-for-word.gif';
import animationServer from './../gifs/server.gif';
import './../styling/RecipeList.css';


export default function SearchList({ number, searchSet, toggleHeart, myList }) {
  const [searchList, setSearchList] = useState({});

const [myListBis, setMyListBis] = useState(myList)


  const searchDetails = {
    search: searchSet.searchRecipe,
    vegetarian: searchSet.vegetarian,
    gluten: searchSet.gluten,
    dairy: searchSet.dairy,
    number: number
  }
  console.log('searchDetails', searchDetails)

  useEffect(() => {
    console.log('in useeffect')
    getSearchResults(searchDetails)
      .then(result => {
        console.log('in searchlist', result)

        if (result.totalResults && result.totalResults > 0) { // Array.isArray(result)
          console.log('got 1 or more results');

          result["results"].map(el => {
            myListBis.includes(el.id) ? el["favorite"] = true : el["favorite"] = false;
          })

          setSearchList({ resultBoolean: 'ok', resultArray: result["results"] });

        } else if (result.totalResults === 0) {
          // alert("Couldn't get any result for your search :/");
          console.log('what you want ot see')
          const message = `Sorry we couldn't find anything for ' ${searchDetails.search} '`
          setSearchList({ resultBoolean: 'notOk', displayText: message })
        }
      })
      .catch(error => {
        console.log("getSearchResults()", error)
        setSearchList({ resultBoolean: 'serverIssue', displayText: 'Error from server' })
      })

  }, [searchSet])
console.log('searchList', searchList)


  function heartClick(recipeId) {
    console.log('searchList.resultArray', searchList.resultArray)
    console.log('searchList', searchList)
    const newSearchList = searchList.resultArray.map(el => {
      console.log('in map')
      if (el.id === recipeId) {
        console.log('found Id')
        el.favorite = !el.favorite;
        if (el.favorite) {
          setMyListBis([...myListBis, recipeId])
        } else {
          setMyListBis(myListBis.filter(id => id !== recipeId))
        }
      }
      return el
    });
    console.log('newSearchList', newSearchList)
    const statusValue = 'ok';
    console.log('statusValue', statusValue)
    setSearchList({resultArray: newSearchList, resultBoolean: statusValue })

  }

  useEffect(() => {
    localStorage.setItem("myFavorites", JSON.stringify(myListBis))
  }, [myListBis])


  return (
    <div className="list-container" >
      <div className="recipe-list-frame">
        {searchList.resultBoolean === 'ok' &&
          (searchList.resultArray.map(el => {
            return (
              <div className="recipe-frame" key={el.id}>
                <button className="heart-btn" onClick={() => (heartClick(el.id))} >
                  {el["favorite"] ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
                <Link to={`/${el.id}`} key={el.id} onClick={scrollToTop}>
                  <RecipeView toggleHeart={toggleHeart} recipe={el} key={el.id} />
                </Link>

              </div>

            )
          })
          )
          || searchList.resultBoolean === 'notOk' &&
          (<div>
            <div style={{'font-size': '20px'}}>{searchList.displayText}</div>
            <img src={animationSearch} style={{ width: '20vw' }} />
          </div>)
          || searchList.resultBoolean === 'serverIssue' &&
          (
            <div>
            <div style={{'font-size': '20px'}} >{searchList.displayText}</div>
            <img src={animationServer} style={{ width: '20vw' }} />
          </div>
          )
        }

      </div>
    </div>
  )
}
