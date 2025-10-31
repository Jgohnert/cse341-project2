const express = require("express");
const routes = express.Router();
const homeRoute = require("../controllers/homeLoginController");
const spells = require("./spellsRoute");
const monsters = require("./monstersRoute");
const {
    requiresAuth
} = require("express-openid-connect");

routes.use(express.json());

routes.get("/", homeRoute.homepageRoute);

routes.use(
    "/spells",
    requiresAuth(),
    spells
);

routes.use(
    "/monsters",
    requiresAuth(),
    monsters
);

module.exports = routes;