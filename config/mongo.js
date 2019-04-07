
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = require('../models/user-mongo');
const CityModel = require('../models/city-mongo');
const ProductModel = require('../models/product-mongo');

mongoose.connect('mongodb+srv://alex:spassword@cluster0-uk5cy.mongodb.net/test?retryWrites=true', 
    {
        useNewUrlParser: true,
        dbName: 'test-db'
    }
);

let user = {
    external_id: '1234',
    username: 'Alex',
    password: 'spasswordmongo',
    email: 'alex@alexmong.com'
}

let product = {
    external_id: '43434123',
    displayName: 'Super Product',
    description: 'Fashion one'
}




const importFunc = async (e) => {

    let userM = new UserModel(user);
    await userM.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('User saved');
        }
    });

    let productM = new ProductModel(product);
    await productM.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Product saved');
        }
    });

}





module.exports = importFunc;