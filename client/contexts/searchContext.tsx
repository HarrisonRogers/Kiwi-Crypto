import React, { ReactNode, createContext, useContext, useState } from 'react'

interface CryptoSearchCoin {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const defaultSearchContext: CryptoSearchCoin = {
  searchTerm: '',
  setSearchTerm: () => {},
}

const SearchContext = createContext<CryptoSearchCoin>(defaultSearchContext)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = (): CryptoSearchCoin => useContext(SearchContext)
