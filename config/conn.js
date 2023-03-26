const { MongoClient, ServerApiVersion } = require("mongodb")
require("dotenv").config()
const connectionString = process.env.MONGO_URL_CLOUD
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
})

let dbConnection
module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                console.log("🌿 ~ file: conn.js:15 ~ err :", err)
                return callback(err)
            }

            dbConnection = db.db("tfm")
            console.log("Successfully connected to MongoDB.")

            return callback()
        })
    },

    getDb: function () {
        return dbConnection
    },
}
