const jsonServer = require('json-server');
const server = jsonServer.create();
const multer = require('multer');


const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads'); // pasta onde serão armazenadas as imagens
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // nome original do arquivo
  },

});

const upload = multer({ storage: storage });

server.post('/posts', upload.single('image'), (req, res) => {
  const file = req.file;
  const url = `http://localhost:8080/uploads/${file.originalname}`;
  const image = {
    id: Date.now(),
    img: url,
    name: req.body.name,
    message: req.body.message,

  };
  router.db.get('images').push(image).write();
  res.json(image);
});

server.use(router);
server.listen(process.env.PORT ? process.env.PORT : 8080, () => {
  console.log('JSON Server is running');
});