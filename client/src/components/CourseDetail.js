import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function CourseDetail({ context }) {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      setCourse(data);
      setIsLoading(false);
    });
  }, []);

  const handleDeleteCourse = () => {
    context.data.deleteCourse(id);
  };

  return !isLoading ? (
    <>
      <div className='actions--bar'>
        <div className='wrap'>
          {context.authenticatedUser &&
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
          ) : null}
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
