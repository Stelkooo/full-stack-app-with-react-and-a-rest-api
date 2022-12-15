import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function CourseDetail({
  context: {
    actions: { getCourse },
  },
}) {
  const { id } = useParams();

  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourse(id).then((data) => setCourse(data));
  }, []);

  const {
    title,
    description,
    user: { firstName, lastName },
  } = course;

  return (
    <>
      <div className='actions--bar'>
        <div className='wrap'>
          <a
            className='button'
            href={`/courses/${id}/update`}
          >
            Update Course
          </a>
          <a className='button'>Delete Course</a>
          <a className='button button-secondary'>Return to List</a>
        </div>
      </div>
      <div className='wrap'>
        <h2>Course Detail</h2>
        <form>
          <div className='main--flex'>
            <div>
              <h3 className='course--detail--title'>Course</h3>
              <h4 className='course--name'>{title}</h4>
              <p>By {firstName}</p>
              <p>{description}</p>
            </div>
            <div>
              <h3 className='course--detail--title'>Estimated Time</h3>
              <p>14 hours</p>
              <h3 className='course--detail--title'>Materials Needed</h3>
              <ul className='course--detail--list'>
                <li>Example material</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
