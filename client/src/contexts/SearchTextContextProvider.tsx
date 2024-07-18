import { createContext, useState } from 'react';
import { useDebounce } from '../lib/hooks';

type SearchTextContextStore = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearch: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextStore | null>(
  null
);

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 1000);

  const handleChangeSearchText = (newSearch: string) => {
    setSearchText(newSearch);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, handleChangeSearchText, debouncedSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
