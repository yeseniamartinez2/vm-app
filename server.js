const swaggerUi = require("swagger-ui-express")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const routes = require("./routes")
const dbo = require("./config/conn")
require("dotenv").config()
var cors = require("cors")

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions))
app.use(express.static("uploads"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
swaggerDocument = require("./swaggerDocument")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/", routes)

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
        console.error(err)
        process.exit()
    }

    // start the Express server
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is running on port: 3001`)
    })
})

module.exports = {
    app,
}
