
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = mongoose.model('Product', new Schema({
    external_id: String,
    displayName: String,
    description: String
}, { collection: 'product' }));

module.exports = ProductModel;