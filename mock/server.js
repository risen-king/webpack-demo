const path = require('path');

const jsonServer = require('json-server')
const bodyParser = require('body-parser');
const multer = require('multer');
const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname,'./data/db.json'));
const loginMiddleware = require(path.resolve(__dirname,'./data/login'));
const authMiddleWare = require(path.resolve(__dirname,'./data/auth'));

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));

server.use(jsonServer.defaults())

server.post('/login', loginMiddleware)

//server.use(authMiddleWare);

server.use(router);


server.listen(3000, () => {
    console.log('JSON Server is running')
})