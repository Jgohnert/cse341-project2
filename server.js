const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./db/mongodbConnect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();
const {
    auth
} = require("express-openid-connect");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app
    .use(auth(config))
    .use(bodyParser.json())
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use("/", require("./src/routes"));

const port = process.env.PORT || 3000;
mongodb.connectDb().then(() => {
    app.listen(port, () => {
        console.log("Web Server is listening at port" + (port) + ". Database is connected");
    });
});