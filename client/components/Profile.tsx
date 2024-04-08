/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Link, useLocation } from 'react-router-dom'

export default function Profile() {
  const location = useLocation()
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [openProfile, setOpenProfile] = useState(false)
  const { user, loginWithRedirect, logout } = useAuth0()

  // Handle sign out
  const handleSignOut = () => {
    return logout()
  }

  // Handle sign in
  const handleSignIn = () => {
    return loginWithRedirect()
  }

  // Handle click on image
  const handleClick = () => {
    setOpenProfile((prev) => !prev)
  }

  // Make search bar disappear if not home
  useEffect(() => {
    setShowSearchBar(location.pathname === '/')
  }, [location.pathname])

  return (
    <>
      <IfAuthenticated>
        {user && (
          <img
            onClick={handleClick}
            className="profile-img"
            src={user.picture}
            alt="Profile"
          />
        )}
        {!openProfile ? (
          <Link to="/portfolio">
            {showSearchBar && <button className="btn">Portfolio</button>}
          </Link>
        ) : (
          <button className="btn logout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        )}

        {/* {openProfile && (
          
        )} */}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button className="btn" onClick={handleSignIn}>
          Sign In
        </button>
      </IfNotAuthenticated>
    </>
  )
}
