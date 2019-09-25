const http = require("http");
const url = require("url");
const query = require("querystring");
const staticFileHandler = require("./static-file-handler.js");
const apiHandler = require("./api-handler.js");

const router = {
    'GET': {
        "/": (req, res) => staticFileHandler.serveStaticFile(req, res, "../client/client.html", "text/html"),
        "/style.css": (req, res) => staticFileHandler.serveStaticFile(req, res, "../client/style.css", "text/css"),
        "/getUsers": apiHandler.serveUsers
    },
    notFound: apiHandler.serveNotFound
}

const port = process.env.PORT || process.env.NODE_PORT || 3000;
http.createServer((request, response) => {
    const parsedURL = url.parse(request.url);
    const queryParams = query.parse(parsedURL.query);
    let method = request.method;
    if (!method) {
        method = 'GET';
    }
    if (router[method][parsedURL.pathname]) {
        router[method][parsedURL.pathname](request, response, method);
    } else {
        router.notFound(request, response);
    }
    
}).listen(port);