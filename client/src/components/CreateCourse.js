import React from 'react';

export default function CreateCourse() {
  return (
    <>
      <div className='wrap'>
        <h2>Create Course</h2>
        <div className='validation--errors'>
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        <form>
          <div className='main--flex'>
            <div>
              <label for='courseTitle'>Course Title</label>
              <input
                id='courseTitle'
                name='courseTitle'
                type='text'
              />
              <p>By Joe Smith</p>
              <label for='courseDescription'>Course Description</label>
              <textarea
                for='courseDescription'
                name='courseDescription'
              ></textarea>
            </div>
            <div>
              <label for='estimatedTime'>Estimated Time</label>
              <input
                id='estimatedTime'
                name='estimatedTime'
                type='text'
              />
              <label for='materialsNeeded'>Materials Needed</label>
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
