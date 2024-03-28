/* eslint-disable jsx-a11y/alt-text */
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav() {
  const { user, loginWithPopup, logout } = useAuth0()

  // Handle sign out
  const handleSignOut = () => {
    return logout()
  }

  // Handle sign in
  const handleSignIn = () => {
    return loginWithPopup()
  }

  console.log(user)

  return (
    <div className="container">
      <div className="navbar">
        <h2>KiwiCrypto</h2>
        <IfAuthenticated>
          <button onClick={handleSignOut}>Sign Out</button>
          {user && <img className="profile-img" src={user.picture} />}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign In</button>
        </IfNotAuthenticated>
      </div>
    </div>
  )
}
