import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function UpdateCourse({ context }) {
  const { id } = useParams();

  const [course, setCourse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [materialsNeeded, setMaterialsNeeded] = useState(null);

  useEffect(() => {
    context.data.getCourse(id).then((data) => {
      setCourse(data);
      setTitle(data.title);
      setDescription(data.description);
      setEstimatedTime(data.estimatedTime);
      setMaterialsNeeded(data.materialsNeeded);
      setIsLoading(false);
    });
  }, []);

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
      .updateCourse(id, body, {
        emailAddress: 'joe@smith.com',
        password: 'joepassword',
      })
      .then((errors) => console.log(errors));
  };

  return !isLoading ? (
    <>
      <div className='wrap'>
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className='main--flex'>
            <div>
              <label htmlFor='courseTitle'>Course Title</label>
              <input
                id='courseTitle'
                name='courseTitle'
                type='text'
                defaultValue={course.title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>
              <label htmlFor='courseDescription'>Course Description</label>
              <textarea
                htmlFor='courseDescription'
                name='courseDescription'
                defaultValue={course.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
                defaultValue={course.estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
                defaultValue={course.materialsNeeded}
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
            to={`/`}
            className='button button-secondary'
          >
            Cancel
          </Link>
        </form>
      </div>
    </>
  ) : null;
}
