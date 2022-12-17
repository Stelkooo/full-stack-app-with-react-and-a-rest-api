import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ context }) {
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link to={'/'}>Courses</Link>
        </h1>
        <nav className='header--signedout'>
          <ul>
            <li>
              {context.authenticatedUser ? (
                `Welcome, ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}!`
              ) : (
                <Link to={'/signup'}>Sign Up</Link>
              )}
            </li>
            <li>
              {context.authenticatedUser ? (
                <Link to={'/signout'}>Sign Out</Link>
              ) : (
                <Link to={'/signin'}>Sign In</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
