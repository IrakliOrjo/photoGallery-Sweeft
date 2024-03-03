import React, { useState, useEffect, useContext,ChangeEvent  } from 'react';
import { SearchContext, SearchContextType } from './searchContext';

const Search = ({}) => {

  const { setSearchWord, setTypeOfSearch,
    setPage,setIsSearchEnabled,searchQuery, setSearchQuery} = useContext(SearchContext)  as SearchContextType;
  

    //performs search 2 seconds after user finishes typing
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery) {
          setTypeOfSearch('search')
        setPage(1)
        setIsSearchEnabled(true)
        
         setSearchWord(prevSearchWords => [...prevSearchWords, searchQuery]);
 
 
      }
    }, 2000);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  
  //updates value of input state
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className='my-11'>
        <input
        className='rounded-md border border-black p-2 w-[22rem] h-[2rem]'
        type="text"
        placeholder="ძებნა..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default Search