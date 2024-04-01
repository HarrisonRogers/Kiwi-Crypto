/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()
  const [showSeachBar, setShowSearchBar] = useState(true)
  const { user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0()

  // Handle sign out
  const handleSignOut = () => {
    return logout()
  }

  // Handle sign in
  const handleSignIn = () => {
    return loginWithRedirect()
  }

  // Send data back to a user
  // const sendUserDataToBackend = async () => {
  //   try {
  //     const accessToken = await getAccessTokenSilently()
  //     const response = await fetch('/api/v1/callback', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({}),
  //     })

  //     const responseData = await response.json()
  //     console.log(responseData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // If a user signs in
  // useEffect(() => {
  //   if (user) {
  //     sendUserDataToBackend()
  //   }
  // }, [user])

  // Make search bar disappear if not home
  useEffect(() => {
    setShowSearchBar(location.pathname === '/')
  }, [location.pathname])

  return (
    <div id="navbar">
      <div className="nav">
        <div className="nav-display">
          <Link to="/">
            <h2>KiwiCrypto</h2>
          </Link>
          <div className="nav-middle">
            {showSeachBar && (
              <input type="text" placeholder="Search for Crypto" />
            )}
            <IfAuthenticated>
              <Link to="/portfolio">
                {showSeachBar && <button className="btn">Portfolio</button>}
              </Link>
            </IfAuthenticated>
          </div>
          <div className="nav-right">
            <IfAuthenticated>
              {user && <img className="profile-img" src={user.picture} />}
              <button className="btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </IfAuthenticated>
            <IfNotAuthenticated>
              <button className="btn" onClick={handleSignIn}>
                Sign In
              </button>
            </IfNotAuthenticated>
          </div>
        </div>
      </div>
    </div>
  )
}
