import React from 'react';

export default class UserSignIn extends React.Component {
  render() {
    return (
      <>
        <div className='form--centered'>
          <h2>Sign In</h2>
          <form>
            <label htmlFor='emailAddress'>Email Address</label>
            <input
              id='emailAddress'
              name='emailAddress'
              type='email'
            />
            <label htmlFor='password'>Password</label>
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
            Don't have a user account? Click here to <a>sign up</a>!
          </p>
        </div>
      </>
    );
  }
}
