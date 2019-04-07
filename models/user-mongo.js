
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = mongoose.model('User', new Schema({
    external_id: String,
    username: String,
    password: String,
    email: String
}, { collection: 'user' }));

module.exports = UserModel;