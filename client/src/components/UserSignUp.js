import React from 'react';

export default function UserSignUp() {
  return (
    <>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        <form>
          <label for='firstName'>First Name</label>
          <input
            id='firstName'
            name='firstName'
            type='text'
          />
          <label for='lastName'>Last Name</label>
          <input
            id='lastName'
            name='lastName'
            type='text'
          />
          <label for='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
          />
          <label for='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
          />
          <button
            className='button'
            type='submit'
          >
            Sign Up
          </button>
          <button className='button'>Cancel</button>
        </form>
        <p>
          Already have a user account? Click here to <a>sign in</a>!
        </p>
      </div>
    </>
  );
}
