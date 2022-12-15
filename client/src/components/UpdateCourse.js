import React from 'react';

export default function UpdateCourse() {
  return (
    <>
      <div className='wrap'>
        <h2>Update Course</h2>
        <form>
          <div className='main--flex'>
            <div>
              <label htmlFor='courseTitle'>Course Title</label>
              <input
                id='courseTitle'
                name='courseTitle'
                type='text'
              />
              <p>By Joe Smith</p>
              <label htmlFor='courseDescription'>Course Description</label>
              <textarea
                htmlFor='courseDescription'
                name='courseDescription'
              ></textarea>
            </div>
            <div>
              <label htmlFor='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
              />
              <label htmlFor='materialsNeeded'>Materials Needed</label>
              <textarea
                id='materialsNeeded'
                name='materialsNeeded'
              ></textarea>
            </div>
          </div>
          <button
            className='button'
            type='submit'
          >
            Update Course
          </button>
          <button className='button button-secondary'>Cancel</button>
        </form>
      </div>
    </>
  );
}
