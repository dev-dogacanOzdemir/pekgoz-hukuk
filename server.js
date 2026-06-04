const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'pekgoz-hukuk');
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if(p==='/') p='/index.html';
  const fp = path.join(root,p);
  fs.readFile(fp,(e,d)=>{
    if(e){res.writeHead(404);res.end('404');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(fp)]||'application/octet-stream'});
    res.end(d);
  });
}).listen(5577,()=>console.log('listening 5577'));
