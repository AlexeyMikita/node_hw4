const jsonWebToken = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.headers['very_secure_token'];

    if(token) {
        jsonWebToken.verify(token, 'very_secret', function(err, decoded) {
            if(err) {
                res.status(403).json({ code: 403, message: "Invalid token"});
            } else {
                console.log("JWT check middleware - request authorized successfully");
                next();
            }
        });
    } else {
        res.status(403).json({ code: 403, message: "Unauthorized"});
    }
}
