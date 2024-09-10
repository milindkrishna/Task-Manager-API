const notFound = (req, res) => {
    res.status(404).send('OOPS Route not found. Try again later!')
}

module.exports = notFound