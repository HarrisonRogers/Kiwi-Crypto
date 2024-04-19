/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom'
import Profile from './Profile'

export default function Nav() {
  return (
    <div id="navbar">
      <div className="nav">
        <div className="nav-display">
          <div className="logo">
            <Link to="/">
              <h2>
                <i className="fa-solid fa-kiwi-bird"></i> KiwiCrypto
              </h2>
            </Link>
          </div>
          <div className="nav-middle">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for Crypto"
            />
          </div>
          <div className="nav-right">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  )
}
