import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            exact
            path='/'
            component={Courses}
          />
          <Route
            path='/courses/create'
            component={CreateCourse}
          />
          <Route
            path='/courses/:id/update'
            component={UpdateCourse}
          />
          <Route
            path='/courses/:id'
            component={CourseDetail}
          />
          <Route
            path='/signin'
            component={UserSignIn}
          />
          <Route
            path='/signup'
            component={UserSignUp}
          />
          <Route
            path='/signout'
            component={UserSignOut}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
