const jsonServer = require('json-server')
const bodyParser = require('body-parser');
var multer = require('multer');
const server = jsonServer.create()
const router = jsonServer.router('./data/db.json')
const middlewares = jsonServer.defaults()


const loginMiddleware = require('./data/login');
const authMiddleWare = require('./data/auth')

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));
//server.use(multer());


// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)


server.post('/login', loginMiddleware)

//server.use(authMiddleWare);



server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})