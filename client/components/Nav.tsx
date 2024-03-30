/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {
  const { user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0()

  // Handle sign out
  const handleSignOut = () => {
    return logout()
  }

  // Handle sign in
  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const sendUserDataToBackend = async () => {
    try {
      const accessToken = await getAccessTokenSilently()
      console.log(accessToken)
      const response = await fetch('/api/v1/callback', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userSub: user?.sub }),
      })

      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user) {
      sendUserDataToBackend()
    }
  }, [])

  return (
    <div className="container">
      <div className="navbar">
        <h2>KiwiCrypto</h2>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign Out</button>
          {user && <img className="profile-img" src={user.picture} />}
          {user && <p>{user.sub}</p>}
          {user && <p>{user.name}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign In</button>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}
