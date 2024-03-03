import { useEffect, useContext } from 'react'
import Search from './Search'
import Modal from '../utils/Modal'
import { useFetchMain } from './Utils'
import { SearchContext } from './searchContext'
import SearchResult from './SearchResult'
import { v4 as uuidv4 } from 'uuid';
import { SearchContextType } from './searchContext'



const Main = () => {
  //importing context data
   const {typeOfSearch, setTypeOfSearch,
    page, setPage,selectedImageUrl, setSelectedImageUrl,isOpen, setIsOpen} = useContext(SearchContext) as SearchContextType;;
   
    //fetching main page data
    const mainData = useFetchMain()
    
    //if user scrolls down the page, we fetch next page
 useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if(typeOfSearch === 'main'){

          mainData.fetchNextPage()
        }
        setPage(prevPage => prevPage + 1)
        
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  //open modal and update state with data for modal
  const openModal = (imageUrl:string,id:string,likes:string) => {
    setSelectedImageUrl([imageUrl,id,likes])
    setIsOpen(true)
   
  };

  //close modal update modal state data with null
  const closeModal = () => {
    setSelectedImageUrl(null)
    setIsOpen(false)
  };

  
  return ( 
    <div className='rounded-lg flex flex-col justify-center items-center'> 
        
        <Search />
        <div className='grid grid-cols-5 gap-4'>
            
            {mainData && typeOfSearch === 'main' && mainData.data?.pages.map(page => page.data.map((item:any) => {
                return (   
                    <div 
                    key={uuidv4()}
                    className='cursor-pointer'>   
                         
                        <img 
                          className='h-auto  transition-transform duration-300 transform-gpu hover:scale-105'
                          onClick={() => openModal(item.urls.regular,item.id,item.likes)} src={item.urls.thumb} />
                       
                    </div>
                )
            }))}
            
            </div>
            <SearchResult />
            {selectedImageUrl && (
        <Modal isOpen={isOpen} onClose={closeModal} likes={selectedImageUrl[2]} imageUrl={selectedImageUrl[0]} id={selectedImageUrl[1]}/>
      )}
    </div>
  ) 
}

export default Main