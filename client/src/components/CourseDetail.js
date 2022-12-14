import React from 'react';

export default class CourseDetail extends React.Component {
  render() {
    return (
      <main>
        <div className='actions--bar'>
          <div className='wrap'>
            <a className='button'>Update Course</a>
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
                <h4 className='course--name'>Course Name</h4>
                <p>By Joe Smith</p>
                <p>Example Test</p>
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
      </main>
    );
  }
}
