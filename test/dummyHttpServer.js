var http = require("http");

const PORT = 8888;

function handleRequest(request, response) {
  if (request.url === "/test/get" && request.method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end('{ "test": { "data": "Test Data" } }');
  } else if (request.url === "/test/post" && request.method === "POST") {
    request.on("data", function(data) {
      var json = JSON.parse(data);
      if (json.test.check) {
        response.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "transfer-encoding": "chunked"
        });
        response.write(data);
        response.end();
      } else {
        // Bad request
        response.writeHead(400, {});
        response.end();
      }
    });
  } else if (request.url === "/test/put" && request.method === "PUT") {
    request.on("data", function(data) {
      response.writeHead(201, {
        "Content-Type": "text/html; charset=utf-8",
        "transfer-encoding": "chunked"
      });
      response.write(data);
      response.end();
    });
  } else if (request.url === "/test/delete" && request.method === "DELETE") {
    response.writeHead(204);
    response.end();
  } else if (request.url === "/test/xml") {
    response.writeHead(200, { "Content-Type": "application/xml" });
    response.end(
      "<response><test>Test Response</test><test>Another Response</test></response>"
    );
  } else {
    response.writeHead(400);
    response.end();
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:%s", PORT);
});
