import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ context }) {
  const location = useLocation();

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
                <Link
                  to={`/signup`}
                  state={{ from: location.state?.from }}
                >
                  Sign Up
                </Link>
              )}
            </li>
            <li>
              {context.authenticatedUser ? (
                <Link to={`/signout`}>Sign Out</Link>
              ) : (
                <Link
                  to={`/signin`}
                  state={{ from: location.pathname }}
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
