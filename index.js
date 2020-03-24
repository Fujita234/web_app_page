'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
//  res.write(req.headers['user-agent']);
switch (req.method) {
  case 'GET':
//      res.write('GET ' + req.url);
      const fs = require('fs');
      const rs = fs.createReadStream('./form.html');
      rs.pipe(res);
      break;
    case 'POST':
//      res.write('POST ' + req.url);
      let rawData = '';
      req.on('data', (chunk) => {
        rawData = rawData + chunk;
      }).on('end', () => {
        const decoded = decodeURIComponent(rawData);
        console.info('[' + now + '] 投稿: ' + decoded);
        res.write('<!DOCTYPE html><html lang="ja"><body><h1>' +
                      decoded + 'が投稿されました</h1></body></html>');
        res.end();
      });
      break;
    case 'DELETE':
      res.write('DELETE ' + req.url);
      break;
    default:
      break;
  }
}).on('error', (e) => {
  console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
  console.error('[' + new Date() + '] Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});