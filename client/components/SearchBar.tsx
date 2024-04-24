import { useSearch } from '../contexts/searchContext'

export default function SearchBar() {
  const { setSearchTerm } = useSearch()

  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search for Crypto"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )
}
