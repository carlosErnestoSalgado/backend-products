// Importo express
const express= require('express');
const app = express();


// Importar Serverless
const serverless = require('serverless-http')

// Creo el router
const router = express.Router();


// Morgan para Logger desde consola
const morgan = require('morgan');

// Para permitir solicitudes de todos los origenes
const cors = require('cors');


// Uso estatico
app.use(express.static('build'));


// Para poder leer el body de la solicitud HTTP POST
app.use(express.json());
app.use(express.urlencoded({extended: true}))


// Crando el token para obtener el body en caso de solicitud http POST
morgan.token('body', (req, res) => {
if(req.method === 'POST'){
    return JSON.stringify(req.body);
}else{
    return "Isn't POST method"
}
});
app.use(morgan(':method :url :response-time :body'))

// Permitir solicitudes de todos los origenes
app.use(cors());



// Productos de la tienda
const productos = [
  {
      "precio": 500,
      "id": 1,
      "title": "Laptop HP",
      "cantidad": 1,
      "thumbnailUrl": "/assets/foto-1.png"
  },

  {
      "precio": 300,
      "id": 2,
      "title": "Tester",
      "cantidad": 1,
      "thumbnailUrl": "/assets/foto-2.png"
  },

  {
      "precio": 100,
      "id": 3,
      "title": "Desbozadora",
      "cantidad": 1,
      "thumbnailUrl": "/assets/foto-3.png"
  },
  {
      "precio": 300,
      "id": 4,
      "title": "Tester",
      "cantidad": 1,
      "thumbnailUrl": "/assets/foto-2.png"
  },

  {
      "precio": 100,
      "id": 5,
      "title": "Desbozadora",
      "cantidad": 1,
      "thumbnailUrl": "/assets/foto-3.png"
  },
];

// Solicitud HTTP GET a la ruta /api/products  
router.get('/api/products', (request, response) => {
    response.json(productos);
})

// Solicitud HTTP GET a la ruta /api/products/:id
router.get('/api/products/:id', (request, response) => {
  const id = Number(request.params.id);
  const product = productos.find(prod => prod.id === id);
  return response.json(product)
})

app.use('/api/', router);

module.exports.handler = serverless(app);
