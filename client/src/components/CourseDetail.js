import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default function CourseDetail({ context }) {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      setCourse(data);
      setIsLoading(false);
    });
  }, []);

  const formatDescription = () => {
    if (course.description) {
      const splitDescription = course.description.split('\n');
      let blanksRemovedDescription = [];
      splitDescription.forEach((e) => {
        if (e !== '') {
          blanksRemovedDescription.push(e);
        }
      });

      return blanksRemovedDescription.map((e, index) => {
        return <p key={index}>{e}</p>;
      });
    }
  };

  const handleDeleteCourse = () => {
    context.data.deleteCourse(id);
  };

  const formatMaterialsNeeded = () => {
    let splitMaterials = course.materialsNeeded.split('\n');

    return splitMaterials.map((e, index) => {
      return <li key={index}>{e.slice(2)}</li>;
    });
  };

  return !isLoading ? (
    <>
      <div className='actions--bar'>
        <div className='wrap'>
          <Link
            className='button'
            to={{
              pathname: `/courses/${id}/update`,
              state: { prevPath: location.pathname },
            }}
          >
            Update Course
          </Link>
          <button
            className='button'
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
          <Link
            className='button button-secondary'
            to={{
              pathname: `/`,
              state: { prevPath: location.pathname },
            }}
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
              {formatDescription()}
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>{course.estimatedTime ? course.estimatedTime : `N/A`}</p>
              <h3 className='course--detail--title'>Materials Needed</h3>
              {course.materialsNeeded ? (
                <ul className='course--detail--list'>
                  {formatMaterialsNeeded()}
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
