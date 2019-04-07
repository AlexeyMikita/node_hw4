
const {Product} = require('../models');

module.exports = {
    all: (req, res) => Product.findAll().then(
        products => {
            console.log(products);
            res.status(200).send(products);
    }).catch(error => {
        console.log(error.message);
        res.status(400).send(error.message);
    }),

    getProductById: (req, res) => Product.findByPk(req.params.id).then(
        products => {
            console.log(products);
            res.status(200).send(products);
    }).catch(error => {
        console.log(error.message);
        res.status(400).send(error.message);
    }),

    getReviewsByProductId: (req, res) => {
        res.end('Reviews by product with Id ' + req.params.id)
    },
    
    addNewProduct: (req, res) => {
        res.end('Add new product');
    }
};