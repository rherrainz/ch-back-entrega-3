import express from 'express';
import {ProductManager} from './controller/productManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./db/products.json');

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/productos', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

app.listen(PORT, () => {
    console.log('Servidor inicializado');
});