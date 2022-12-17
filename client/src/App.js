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

import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            exact
            path='/'
            element={<CoursesWithContext />}
          />
          <Route
            path='/courses/create'
            element={<CreateCourseWithContext />}
          />
          <Route
            path='/courses/:id/update'
            element={<UpdateCourse />}
          />
          <Route
            path='/courses/:id'
            element={<CourseDetailWithContext />}
          />
          <Route
            path='/signin'
            element={<UserSignInWithContext />}
          />
          <Route
            path='/signup'
            element={<UserSignUpWithContext />}
          />
          <Route
            path='/signout'
            element={<UserSignOut />}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
