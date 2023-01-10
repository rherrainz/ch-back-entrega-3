import fs from 'fs';
class ProductManager {
    constructor(path){
        this.path = path;
    }
    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                const infoProducts = await fs.promises.readFile(this.path, 'utf-8');
                const infoProductsJS = JSON.parse(infoProducts);
                return infoProductsJS;
            }else{
                return [];
            }
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
    async addProduct(title,description,price,thumbnail,code,stock){
        try{
            const product ={
                id: await this.#generateId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            const products = await this.getProducts();

            
            products.push(product);
            //console.log(products);
            await fs.promises.writeFile(this.path,JSON.stringify(products));
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async getProductById(id){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else return product;
    }
    async updateProductById(id,title,description,price,thumbnail,code,stock){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else {
            product.title = title;
            product.description = description;
            product.price = price;
            product.thumbnail = thumbnail;
            product.code = code;
            product.stock = stock;
        }
        products.push(product);
        await fs.promises.writeFile(this.path,JSON.stringify(products));
    }

    async deleteProductById(id){
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (product === undefined)  return console.log("Not found")
        else {
            const index = products.indexOf(product);
            products.splice(index,1);
        }
        await fs.promises.writeFile(this.path,JSON.stringify(products));
    }

    async #generateId(){
        const products = await this.getProducts();
        const id = products.length === 0
         ? 1 
         : products[products.length -1].id + 1;
        return id;
    }

}

export const getProducts = new ProductManager('./products.json');
/*async function test(){
    await getProducts.addProduct('iphone 14','smartphone',799,'no-img',123456,10);
    await getProducts.addProduct('ipad air','tablet',499,'no-img',123457,8);
    await getProducts.addProduct('macbook air','laptop',999,'no-img',123458,7);
    await getProducts.addProduct('macbook pro','laptop',1199,'no-img',123459,5);
    await getProducts.addProduct('iphone 14 pro','smartphone',999,'no-img',123460,11);
    await getProducts.addProduct('ipad pro','tablet',799,'no-img',123461,6);
}
test();*/