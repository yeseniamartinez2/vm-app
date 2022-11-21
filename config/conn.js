<<<<<<< HEAD
const { MongoClient, ServerApiVersion } = require("mongodb")
require("dotenv").config()
const connectionString = process.env.MONGO_URL_CLOUD
=======
const { MongoClient } = require("mongodb");
require("dotenv").config();
const connectionString = process.env.MONGO_URL_CLOUD;
console.log("🚀 ~ file: conn.js ~ line 4 ~ connectionString", connectionString);
>>>>>>> e2ea22d4c541f92a050cd2a5ff560b425fddae57
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
