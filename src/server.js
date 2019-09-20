const http = require("http");
const url = require("url");
const query = require("querystring");
const staticFileHandler = require("./static-file-handler.js");

const router = {
    'GET': {
        "/": (req, res) => staticFileHandler.serveStaticFile(req, res, "../client/client.html", "text/html"),
        "/style.css": (req, res) => staticFileHandler.serveStaticFile(req, res, "../client/style.css", "text/css")
    }
}

const port = process.env.PORT || process.env.NODE_PORT || 3000;
http.createServer((request, response) => {
    const parsedURL = url.parse(request.url);
    const queryParams = query.parse(parsedURL.query);
    let method;
    if (!router[request.method]) {
        method = 'GET';
    }
    
}).listen(port);