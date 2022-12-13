const MyError = require('../error/MyError')

module.exports = function(err, req, res, next) {
    if (err instanceof MyError) {
        res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Some error!'})
}
