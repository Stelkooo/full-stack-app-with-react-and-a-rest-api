import React from 'react';

export default function Header() {
  return (
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'>
          <a>Header</a>
        </h1>
        <nav className='header--signedout'>
          <ul>
            <li>Sign In</li>
            <li>Sign Out</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
