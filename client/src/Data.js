import apiBaseUrl from './config';

export default class Data {
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null,
  ) {
    const url = apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`,
      );

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }
  /*
send get request to api to get all the courses
  */
  async getCourses() {
    const response = await this.api('/courses', 'GET', null, false, null).catch(
      (err) => {
        return 500;
      },
    );
    if (response.status === 200) {
      return response.json().then((data) => data.message);
    } else {
      return 500;
    }
  }
  /*
send get request to api to get specific course
  */
  async getCourse(id) {
    const response = await this.api(
      `/courses/${id}`,
      'GET',
      null,
      false,
      null,
    ).catch((err) => {
      return 500;
    });
    if (response.status === 200) {
      return response.json().then((data) => data.message);
    } else {
      return 500;
    }
  }
  /*
send delete request to api to delete a specific course
  */
  async deleteCourse(id, credentials) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      username: credentials.emailAddress,
      password: credentials.password,
    }).catch((err) => {
      return 500;
    });
    return response.status || 500;
  }
  /*
send get request to api to get user info
  */
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      username,
      password,
    }).catch((err) => {
      return 500;
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      return 500;
    }
  }
  /*
send post request to api to create a new user
  */
  async createUser(body) {
    const response = await this.api(`/users`, 'POST', body, false, null).catch(
      (err) => {
        return 500;
      },
    );
    if (response.status === 201) {
      return this.getUser(body.emailAddress, body.password);
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      return 500;
    }
  }
  /*
send post request to api to create a new course
  */
  async createCourse(body, credentials) {
    const response = await this.api(`/courses`, 'POST', body, true, {
      username: credentials.emailAddress,
      password: credentials.password,
    }).catch((err) => {
      return 500;
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      return 500;
    }
  }
  /*
send put request to api to update a course
  */
  async updateCourse(id, body, credentials) {
    const response = await this.api(`/courses/${id}`, 'PUT', body, true, {
      username: credentials.emailAddress,
      password: credentials.password,
    }).catch((err) => {
      return 500;
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      return 500;
    }
  }
}
