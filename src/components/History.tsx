import React, { useContext, useEffect, useState } from 'react'
import { SearchContext, SearchContextType } from './searchContext';
import { useInfiniteQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';
import Modal from '../utils/Modal';
import { v4 as uuidv4 } from 'uuid';


const History = () => {
const {searchWord,setIsSearchEnabled,setTypeOfSearch,typeOfSearch,setPage,isOpen, setIsOpen,
  page,setSelectedImageUrl,selectedImageUrl } = useContext(SearchContext)  as SearchContextType;
const [historyWord, setHistoryWord] = useState<string | null>(null)
const [fetchingEnabled,setFetchingEnabled] = useState(false)



const fetchHistoryData = async ({
    historyWord,
    pageParam = 1,
  }: {
    historyWord: string | null;
    pageParam: number;
  }) => {
      

    return await axios.get<object[]>(
      `https://api.unsplash.com/search/photos/?client_id=FuyMmQKj3BlQPoUDmSuSAGpxvEuUjOlF5rlI3x04ECk&page=${pageParam}&per_page=20&query=${historyWord}`
    );
  };
  let search = useSearchHistory()
  


   function useSearchHistory() {
    return useInfiniteQuery({
      queryKey: ["searchHistory", historyWord],
      queryFn: ({ pageParam = 1 }) => fetchHistoryData({ historyWord, pageParam }),
      enabled: fetchingEnabled,
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        // @ts-ignore
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });
  };

  //shows fetched data of the searched word
  function showHistoryWord(word:string){
    setHistoryWord(word)
    setFetchingEnabled(true)
    setIsSearchEnabled(false)
    setTypeOfSearch('history')
    setPage(1)
  }

  //infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if(typeOfSearch === 'history'){

          search.fetchNextPage()
        }
        setPage(prevPage => prevPage + 1)
        
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  //opens modal
  const openModal = (imageUrl:string,id:string,likes:string) => {
    setSelectedImageUrl([imageUrl,id,likes])
    setIsOpen(true)
  
  };
 
  //closes modal
  const closeModal = () => {
    setSelectedImageUrl(null)
    setIsOpen(false)
  
  };
  return (
    <div className='min-h-screen'>
        <div className='flex flex-col mb-4 self-center mx-auto shadow p-4  w-[22rem] mt-8 border-black border-[2px] rounded-lg
        px-6
        '>
            {searchWord.length > 0 && searchWord.map((word) => {
                return (
                    <p 
                    key={uuidv4()}
                    className='cursor-pointer font-semibold border-b border-black
                     text-gray-800 hover:text-blue-500 transition-colors duration-300'
                    onClick={() => showHistoryWord(word.toString())}>{word}</p>
                )
            })}
        </div>

        <div className='grid grid-cols-5 gap-4'>
          {search  
    //@ts-ignore
    && search.data?.pages.map(page => page.data?.results.map((item:any) => {
              
               return (
                    <div 
                    key={uuidv4()}
                    className='cursor-pointer'> 

                        <img className='h-auto  transition-transform duration-300 transform-gpu hover:scale-105'
                        src={item.urls.thumb}  onClick={() => openModal(item.urls.regular,item.id,item.likes)}/>
                       
                    </div>  
                )  
            }))}
            {selectedImageUrl && (
        <Modal isOpen={isOpen} onClose={closeModal} imageUrl={selectedImageUrl[0]} id={selectedImageUrl[1]} likes={selectedImageUrl[2]} />
      )}
        </div>
    </div>
  )
}

export default History