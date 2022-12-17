import React from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {
  state = {
    authenticatedUser: false,
  };

  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        getCourses: this.getCourses,
        signIn: this.signIn,
        signUp: this.signUp,
      },
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  getCourses = async () => {
    const courses = await this.data.getCourses();
    return courses;
  };

  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
    }
    return user;
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
