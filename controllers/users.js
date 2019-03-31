
module.exports = {
    all: (req, res) => {
        console.log(req.url);
        res.end('allUsers');
    }
};