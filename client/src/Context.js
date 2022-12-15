import React from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends React.Component {
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const value = {
      data: this.data,
      actions: {
        getCourses: this.getCourses,
        getCourse: this.getCourse,
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

  getCourse = async (id) => {
    const course = await this.data.getCourse(id);
    return course;
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
