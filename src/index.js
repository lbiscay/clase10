import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import recursos from './routes/recursos';

const app = express();
const port = 8080;

const server = app.listen(port, () =>
  console.log('Servidor levantado en puerto', port)
);

server.on('error', (err) => {
  console.log('Server Error', err);
});

const publicPath = path.resolve(__dirname, '../public');
const layoutPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', recursos);
