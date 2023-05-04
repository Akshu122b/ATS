const mongoose = require("mongoose")
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        })
        console.log(`Mongo DB connected : ${conn.connection.host} & db name: ${conn.connection.name}`)
    }
    catch (err) {
        console.log(err.message)
        process.exit()
    }
}
module.exports = connectDB
