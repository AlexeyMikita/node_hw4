
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    external_id: String,
    name: String,
    country: String,
    capital: Boolean,
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

citySchema.pre('save', function(next){
    this.lastModifiedDate = new Date();
    next();
});


const CityModel = mongoose.model('City', citySchema, 'city') ;



module.exports = CityModel;