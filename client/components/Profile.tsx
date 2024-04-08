import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Link, useLocation } from 'react-router-dom'

export default function Profile() {
  const location = useLocation()
  const [showSearchBar, setShowSearchBar] = useState(true)
  const { user, loginWithRedirect, logout } = useAuth0()

  // Handle sign out
  const handleSignOut = () => {
    return logout()
  }

  // Handle sign in
  const handleSignIn = () => {
    return loginWithRedirect()
  }

  // Make search bar disappear if not home
  useEffect(() => {
    setShowSearchBar(location.pathname === '/')
  }, [location.pathname])

  return (
    <>
      <IfAuthenticated>
        {user && (
          <img className="profile-img" src={user.picture} alt="Profile" />
        )}
        <Link to="/portfolio">
          {showSearchBar && <button className="btn">Portfolio</button>}
        </Link>
        <div className="flex flex-col drop-down-profile">
          <ul className="flex flex-col gap-4">
            <button className="logout" onClick={handleSignOut}>
              Sign Out
            </button>
          </ul>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button className="btn" onClick={handleSignIn}>
          Sign In
        </button>
      </IfNotAuthenticated>
    </>
  )
}
