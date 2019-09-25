const users = {'dan': 1};

const serveUsers = (request, response, method) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    if (method === 'GET') {
        let str = JSON.stringify(users);
        response.write(str);
    }
    response.end();
};

const serveNotFound = (request, response, method) => {
    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write(JSON.stringify({
        message: "Resource not found"
    }));
    response.end();
}


module.exports = {
    serveUsers,
    serveNotFound
  };