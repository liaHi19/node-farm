const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is an overview");
  } else if (pathName == "/product") {
    res.end("This is a product");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hi-hi",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
