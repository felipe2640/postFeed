
const bodyParser = require("body-parser");
const jsonServer = require("json-server");


const server = jsonServer.create();

const router = jsonServer.router("./db.json");

server.use(jsonServer.defaults());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



server.use(router);

server.listen(8080, () => {
  console.log(`Servidor inicializado`);
});
