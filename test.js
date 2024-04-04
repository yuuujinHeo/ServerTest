var http = require('http');
var fs = require('fs');

var app = http.createServer(function (request, response) {
    var url = request.url;
    var template = `
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - Welcome</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="index.html">WEB</a></h1>
        <ul>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ul>
        <h2>WEB</h2>
        <p>
            Web is...
        </p>
    </body>
    </html>
    `
    response.writeHead(200);
    response.end(template); // 수정

});
app.listen(3000);