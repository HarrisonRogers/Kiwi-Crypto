/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Link, useLocation } from 'react-router-dom'
import DropDownSignOut from './Profile'

export default function Nav() {
  return (
    <div id="navbar">
      <div className="nav">
        <div className="nav-display">
          <div className="logo">
            <Link to="/">
              <i className="fa-solid fa-kiwi-bird"></i>
              <h2>KiwiCrypto</h2>
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
            <DropDownSignOut />
          </div>
        </div>
      </div>
    </div>
  )
}
