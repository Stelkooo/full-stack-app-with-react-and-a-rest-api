import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function CreateCourse({ context }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState(null);
  const [errors, setErrors] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userId: 1,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    context.data
      .createCourse(body, {
        emailAddress: 'joe@smith.com',
        password: 'joepassword',
      })
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        }
      });
  };

  return (
    <>
      <div className='wrap'>
        <h2>Create Course</h2>
        {errors.length ? (
          <div className='validation--errors'>
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className='main--flex'>
            <div>
              <label htmlFor='title'>Course Title</label>
              <input
                id='title'
                name='title'
                type='text'
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>By Joe Smith</p>
              <label htmlFor='description'>Course Description</label>
              <textarea
                htmlFor='description'
                name='description'
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            className='button'
            type='submit'
          >
            Update Course
          </button>
          <Link
            className='button button-secondary'
            to={{
              pathname: `/`,
              state: { prevPath: location.pathname },
            }}
          >
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}
