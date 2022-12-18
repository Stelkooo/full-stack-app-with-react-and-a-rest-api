import React from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {
  state = {
    authenticatedUser: false,
  };

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
  /* 
    send a get request to the api to get the user information
    if no 500 is returned and user returned is not null
    return the user info, set the global authenticatedUser state to user
    and update cookies and local storage
  */
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== 500) {
      if (user !== null) {
        this.setState(() => {
          return {
            authenticatedUser: user,
          };
        });
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        localStorage.setItem('password', password);
      }
    }
    return user;
  };

  /*
    set authenticatedUser to null
    remove cookies and local storage
  */
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
    localStorage.removeItem('password');
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => (
          <Component
            {...props}
            context={context}
          />
        )}
      </Context.Consumer>
    );
  };
}
