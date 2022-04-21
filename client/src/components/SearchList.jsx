import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchResults } from './../services/recipeService';

export default function SearchList({ searchValue }) {
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    getSearchResults()
  })

  return (
    <div>Search value: {searchValue}</div>
  )
}

