const errorhandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({msg: err.message})
}

module.exports = errorhandlerMiddleware