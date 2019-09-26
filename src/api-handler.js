const users = {};

const serveUsers = (request, response, method) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  if (method === 'GET') {
    const str = JSON.stringify(users);
    response.write(str);
  }
  response.end();
};

const serveNotReal = (request, response, method) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  if (method === 'GET') {
    response.write(JSON.stringify({
      message: 'Page is not real',
      id: 'notFound',
    }));
  }
  response.end();
};

const serveNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({
    message: 'Resource not found',
    id: 'notFound',
  }));
  response.end();
};

const postUser = (request, response, method, bodyParams) => {
  if (method !== 'POST') {
    return;
  }
  let responseCode;
  let message;
  let id;

  if (!bodyParams.name || !bodyParams.age) {
    responseCode = 400;
    id = 'badRequest';
    message = 'Missing name and age parameters';
  } else if (users[bodyParams.name]) {
    responseCode = 204;
    message = null;
    id = null;
    users[bodyParams.name].age = parseInt(bodyParams.age, 10);
  } else {
    responseCode = 201;
    message = 'User created';
    id = null;
    const newUser = {
      name: bodyParams.name,
      age: parseInt(bodyParams.age, 10),
    };
    users[bodyParams.name] = newUser;
  }
  response.writeHead(responseCode, { 'Content-Type': 'application/json' });
  if (message) {
    const obj = { message };
    if (id) obj.id = id;
    response.write(JSON.stringify(obj));
  }
  response.end();
};


module.exports = {
  serveUsers,
  serveNotReal,
  serveNotFound,
  postUser,
};
