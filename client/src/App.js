import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// components imported
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

// context and private routes imported
import withContext from './Context';
import PrivateRoutes from './PrivateRoutes';

// context given to components
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);

const App = () => {
  return (
    <Router>
      <HeaderWithContext />
      <main>
        <Routes>
          <Route
            exact
            path='/'
            element={<CoursesWithContext />}
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path='/courses/create'
              element={<CreateCourseWithContext />}
            />
            <Route
              path='/courses/:id/update'
              element={<UpdateCourseWithContext />}
            />
          </Route>
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
            element={<UserSignOutWithContext />}
          />
          <Route
            path='/notfound'
            element={<NotFound />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
          <Route
            path='/forbidden'
            element={<Forbidden />}
          />
          <Route
            path='/error'
            element={<UnhandledError />}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
