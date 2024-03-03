import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import { SearchContext, SearchContextType } from "./searchContext";
import { v4 as uuidv4 } from 'uuid';



const SearchResult = () => {
  const {searchWord,typeOfSearch,isSearchEnabled,page,setPage,
     setSelectedImageUrl,isOpen, setIsOpen} = useContext(SearchContext)  as SearchContextType;
  
     //data fetching function
  const fetchSearchData = async ({
    searchWord,
    pageParam = 1,
  }: {
    searchWord: any;
    pageParam: number;
  }) => {
    searchWord = searchWord[searchWord.length-1]
  
    
    return await axios.get<unknown[]>(
      `https://api.unsplash.com/search/photos/?client_id=FuyMmQKj3BlQPoUDmSuSAGpxvEuUjOlF5rlI3x04ECk&page=${pageParam}&per_page=20&query=${searchWord}`
    );
  };
  //query function
   function useSearch() {
    return useInfiniteQuery({
      queryKey: ["search", searchWord],

      queryFn: ({ pageParam = 0 }) => fetchSearchData({ searchWord, pageParam }),
      enabled:isSearchEnabled,
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

  let search = useSearch();

  //open modal func
  const openModal = (imageUrl:string,id:string,likes:string) => {
    setSelectedImageUrl([imageUrl,id,likes])
    setIsOpen(true)
  };
  //if user scrolls down, we fetch next page and increment the "page" state
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if(typeOfSearch === 'search'){

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

  return (<div className="grid grid-cols-5 gap-4">
    {searchWord.length > 0 && typeOfSearch === 'search'  
    //@ts-ignore
    && search.data?.pages.map(page => page.data?.results.map((item:any) => {
              
               return (
                    <div 
                    key={uuidv4()}
                    className='cursor-pointer'> 
                       
                        <img 
                        className="h-auto  transition-transform duration-300 transform-gpu hover:scale-105"
                        src={item.urls.thumb}  onClick={() => openModal(item.urls.regular,item.id,item.likes)}/>
                       
                    </div>  
                )  
            }))}
  </div>);
};

export default SearchResult;
