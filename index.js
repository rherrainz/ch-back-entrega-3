import express from 'express';
import {ProductManager} from './controller/productManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager('./db/products.json');

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/products', async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts(limit || "max");
    res.json(products);
});

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params;
    const product = await productManager.getProductById(pid);
    res.json(product);
});

app.listen(PORT, () => {
    console.log('Servidor inicializado');
});