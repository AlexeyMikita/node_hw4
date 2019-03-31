
module.exports = {
    all: (req, res) => {
        console.log(req.url);
        res.end('allProducts');
    },
    getProductById: (req, res) => {
        res.end('Product with Id ' + req.params.id);
    },
    getReviewsByProductId: (req, res) => {
        res.end('Reviews by product with Id ' + req.params.id)
    },
    addNewProduct: (req, res) => {
        res.end('Add new product');
    }
};