// import { createServer } from 'https';
// import { parse } from 'url';
// import next from 'next';
// import fs from 'fs';
// import path from 'path';

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, 'dev.kinto.xyz+3-key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'dev.kinto.xyz+3.pem')),
// };

// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url!, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, (err?: Error) => {
//     if (err) throw err;
//     console.log('> Ready on https://kinto.dev:3000');
//   });
// });
