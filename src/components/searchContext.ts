import { createContext } from "react";

//context types
export interface SearchContextType {
  searchWord: String[];
  setSearchWord: React.Dispatch<React.SetStateAction<String[]>>;
  typeOfSearch: String;
  setTypeOfSearch: React.Dispatch<React.SetStateAction<String>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  selectedImageUrl: string | null;
  setSelectedImageUrl: React.Dispatch<React.SetStateAction<any>>;
  isSearchEnabled: boolean;
  setIsSearchEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isOpen: Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = createContext<SearchContextType | null>(null);
