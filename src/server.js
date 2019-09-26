const http = require('http');
const url = require('url');
const query = require('querystring');
const staticFileHandler = require('./static-file-handler.js');
const apiHandler = require('./api-handler.js');

const router = {
  '/': (req, res) => staticFileHandler.serveStaticFile(req, res, '../client/client.html', 'text/html'),
  '/style.css': (req, res) => staticFileHandler.serveStaticFile(req, res, '../client/style.css', 'text/css'),
  '/getUsers': apiHandler.serveUsers,
  '/notReal': apiHandler.serveNotReal,
  '/addUser': apiHandler.postUser,
  notFound: apiHandler.serveNotFound,
};

const parseBody = (request, callback) => {
  const body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    callback(bodyParams);
  });
};

const port = process.env.PORT || process.env.NODE_PORT || 3000;
http.createServer((request, response) => {
  const parsedURL = url.parse(request.url);
  const method = request.method;

  parseBody(request, (bodyParams) => {
    if (router[parsedURL.pathname]) {
      router[parsedURL.pathname](request, response, method, bodyParams);
    } else {
      router.notFound(request, response, method, bodyParams);
    }
  });
}).listen(port);
