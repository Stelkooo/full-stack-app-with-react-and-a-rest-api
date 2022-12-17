import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ context }) {
  const location = useLocation();

  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <Link
            to={{
              pathname: `/`,
              state: { prevPath: location.pathname },
            }}
          >
            Courses
          </Link>
        </h1>
        <nav className='header--signedout'>
          <ul>
            <li>
              {context.authenticatedUser ? (
                `Welcome, ${context.authenticatedUser.firstName} ${context.authenticatedUser.lastName}!`
              ) : (
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { prevPath: location.pathname },
                  }}
                >
                  Sign Up
                </Link>
              )}
            </li>
            <li>
              {context.authenticatedUser ? (
                <Link
                  to={{
                    pathname: `/signout`,
                    state: { prevPath: location.pathname },
                  }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link
                  to={{
                    pathname: `/signin`,
                    state: { prevPath: location.pathname },
                  }}
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
