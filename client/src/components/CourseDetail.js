import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function CourseDetail({ context }) {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  /* 
    on page load fetch course details based on id param
    if no data is returned, send user to /notfound
    if 500 is returned, send user to to /error
    else display the course details
  */
  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      if (data === null) {
        navigate('/notfound');
      } else if (data === 500) {
        navigate('/error');
      } else {
        setCourse(data);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    sends a delete request to the api to delete the course
    if it was successful, send user to /
    if the action was unauthorised or forbidden, send user to /forbidden
    else send user to /error
  */
  const handleDeleteCourse = () => {
    context.data
      .deleteCourse(id, {
        emailAddress: context.authenticatedUser?.emailAddress,
        password: localStorage.getItem('password'),
      })
      .then((res) => {
        if (res === 204) {
          navigate('/');
        } else if (res === 401 || res === 403) {
          navigate('/forbidden');
        } else {
          navigate('/error');
        }
      });
  };

  return !isLoading ? (
    <>
      <div className='actions--bar'>
        <div className='wrap'>
          {
            // only display update and delete actions if user is authenticated and is the course owner
            context.authenticatedUser &&
            context.authenticatedUser.id === course.userId ? (
              <>
                <Link
                  className='button'
                  to={`/courses/${id}/update`}
                >
                  Update Course
                </Link>
                <button
                  className='button'
                  onClick={handleDeleteCourse}
                >
                  Delete Course
                </button>
              </>
            ) : null
          }
          <Link
            className='button button-secondary'
            to={`/`}
          >
            Return to List
          </Link>
        </div>
      </div>
      <div className='wrap'>
        <h2>Course Detail</h2>
        <form>
          <div className='main--flex'>
            <div>
              <h3 className='course--detail--title'>Course</h3>
              <h4 className='course--name'>{course.title}</h4>
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>{course.estimatedTime ? course.estimatedTime : `N/A`}</p>
              <h3 className='course--detail--title'>Materials Needed</h3>
              {course.materialsNeeded ? (
                <ul className='course--detail--list'>
                  <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                </ul>
              ) : (
                <p>No materials needed</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  ) : null;
}
