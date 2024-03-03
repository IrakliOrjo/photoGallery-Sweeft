import  { useEffect, useState } from 'react';
import axios from 'axios'
import './index.css';
import Main from './components/Main'
import History from './components/History';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {  Routes, Route, NavLink  } from "react-router-dom"
import { SearchContext } from './components/searchContext';

const queryClient = new QueryClient()

function App() {
  const [searchWord, setSearchWord] = useState<String[]>([]);
  const [typeOfSearch, setTypeOfSearch] = useState<String>('main')
  const [isSearchEnabled, setIsSearchEnabled] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false)

  // Goes to main page and clears Search input
    function goToMain(){
      setTypeOfSearch('main')
      setSearchQuery('')
    }
  
  return (
    <QueryClientProvider client={queryClient}>
    <div className="app min-h-screen flex flex-col py-4 bg-slate-200 justify-center items-center">
      <div className='border-[2px] flex rounded-md  border-zinc-600 px-11 font-bold gap-[5rem]'>
      <NavLink  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : "hover:text-red-600"
  } onClick={() => goToMain()} to='/'>მთავარი</NavLink>
      <div className='border  border-black h-6 w-0'></div>
      <NavLink  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "text-red-600" : "hover:text-red-600"} to='/history'>ისტორია</NavLink>

      </div>
     <SearchContext.Provider 
     value={{searchWord,setSearchWord,typeOfSearch, setTypeOfSearch,searchQuery, setSearchQuery, page, 
     setPage,selectedImageUrl, setSelectedImageUrl,isSearchEnabled, setIsSearchEnabled,isOpen, setIsOpen}}>
      <Routes>
          <Route path="/" element={<Main  />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
     </SearchContext.Provider>
        
      
    </div>
    </QueryClientProvider>
  );
}

export default App;
