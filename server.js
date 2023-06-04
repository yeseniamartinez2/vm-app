const swaggerUi = require("swagger-ui-express")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer")
const routes = require("./routes")
const dbo = require("./config/conn")
require("dotenv").config()
var cors = require("cors")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
})

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // For legacy browser support
}

app.use(cors(corsOptions))
app.use(express.static("uploads"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
swaggerDocument = require("./swaggerDocument")

const checkScopes = requiredScopes("read:pets")
// app.get("/role", checkJwt, checkScopes, (req, res) =>
//     res.send("Read:pets permission")
// )
// app.get("/", checkJwt, (req, res) => res.send("App is secured"))

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/", routes)

app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    })
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: 5000,
            automatic_payment_methods: { enabled: true },
        })

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        })
    }
})

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
