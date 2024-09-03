import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import { SearchProvider } from '../contexts/searchContext'

function App() {
  return (
    <SearchProvider>
      <Nav />
      <div>
        <Outlet />
      </div>
    </SearchProvider>
  )
}

export default App
