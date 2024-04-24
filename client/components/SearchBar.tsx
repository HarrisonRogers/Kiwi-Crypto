import { useSearch } from '../contexts/searchContext'

export default function SearchBar() {
  const { setSearchTerm } = useSearch()

  return (
    <div className="search-bar">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="Search for Crypto"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
