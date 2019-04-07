
const mongoose = require('mongoose');
const CityModel = require('../models/city-mongo');

let city = [
    {
        external_id: '123123', 
        name: 'Brest',
        country: 'Belarus',
        capital: false,
        location: {
            lat: 52.097621,
            long: 23.734050
        }
    },
    {
        external_id: '3213123',
        name: 'Grodno',
        country: 'Belarus',
        capital: false,
        location: {
            lat: 51.097621,
            long: 21.734050
        }
    }
];


module.exports = {

    all: async (req, res) => {
        let doc = await CityModel.find();
        res.status(200).send(doc);
    },

    createPreConfigured: async (req, res) => {
        try {
            await city.map((ci) => {new CityModel(ci).save()});
            res.status(200).send(city);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    deleteById: async (req, res) => {
        try {
            await CityModel.deleteMany().where('external_id', req.params.id);
            res.status(200).send(req.params.id);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    createOrUpdate: async (req, res) => {
        try {
            let cityM = await CityModel.findOneAndUpdate().where('external_id', req.params.id);
            if (cityM) {
                cityM.capital = true;
            } else {
                cityM = new CityModel(city[0]);
                cityM.external_id = req.params.id;
            } 
            await cityM.save();
            res.status(200).send(cityM);
        } catch (error) {
            res.status(400).send(error);
        }
    }

}