const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {dbName: 'test'})
}

module.exports = connectDB