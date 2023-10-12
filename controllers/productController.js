const Product = ":)";
const {GetProductFromID} = require('../Service/dataService')

async function getProducts(req,res)
{
    try
    {
        console.log(`fun1`);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Hi there, This is a Vanilla Node.js API :3");
        res.end()
    }
    catch(error)
    {
        console.log(error)
    }
}

async function getProduct(req,res,id)
{

    try
    {
        console.log(`fun2`);
        res.writeHead(200, { "Content-Type": "application/json" });
        GetProductFromID(id,res)
    }
    catch(error)
    {
        console.log(error)
    }
}

module.exports = 
{
    getProducts,
    getProduct
}