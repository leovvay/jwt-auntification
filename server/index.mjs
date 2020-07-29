import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import server from 'http';
import router from './router/router.mjs'

const app = express();
const myServer = server.Server(app);
const port = 8080;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

//pre-flight requests
app.options('*', function (req, res) {
  res.send(200);
});

myServer.listen(port, (err) => {
  if (err) {
    throw err;
  }
  /* eslint-disable no-console */
  console.log('Node Endpoints working :)');
});

app.use('/user', router);

app.get('/', (err, res) => {
	res.status(200);
	res.json({ working: true });
	res.end();
});

// app.post('/signup', (err, res) => {
// 	res.status(200);
//   res.send('signup working');
//   const user = reg
// 	// res.end();
// });

// app.post('/login', (err, res) => {
// 	res.status(200);
// 	res.send('working');
// 	res.end();
// });

// app.put('/', (err, res) => {
// 	res.status(200);
// 	res.send('working');
// 	res.end();
// });

export default myServer;
