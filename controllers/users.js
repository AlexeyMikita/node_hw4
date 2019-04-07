
const {User} = require('../models');
 
module.exports = {
    all: (req, res) => User.findAll()
        .then(users => {
            console.log(users);
            res.status(200).send(users);
        })
        .catch(error => {
            console.log(error.message);
            res.status(400).send(error.message);
        })
    // all: (req, res) => {
    //     console.log(req.url);
    //     res.end('allUsers');
    // }
};