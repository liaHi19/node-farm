const http = require('http');
const fs = require('fs');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsTemp = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const result = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsTemp);

    res.end(result);

    //product
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const product = dataObj[query.id];
    const result = replaceTemplate(tempProduct, product);

    res.end(result);
  }

  // api
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    // not found
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-header': 'Hi-hi',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000');
});
