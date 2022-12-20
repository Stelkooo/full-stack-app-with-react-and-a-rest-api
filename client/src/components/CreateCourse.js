import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateCourse({ context }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  /*
    on form submit, send a post request to api
    if an array is returned, display errors
    if 500 is returned, send user to /error
    else send user to /
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userId: context.authenticatedUser?.id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    context.data
      .createCourse(body, {
        emailAddress: context.authenticatedUser?.emailAddress,
        password: context.authenticatedUser?.password,
      })
      .then((res) => {
        if (res.length) {
          setErrors(res);
        } else if (res === 500) {
          navigate('/error');
        } else {
          navigate('/');
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
            Create Course
          </button>
          <Link
            className='button button-secondary'
            to={`/`}
          >
            Cancel
          </Link>
        </form>
      </div>
    </>
  );
}
