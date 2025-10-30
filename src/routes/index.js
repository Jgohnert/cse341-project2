const express = require("express");
const routes = express.Router();
const homeRoute = require("../controllers/homeLoginController");
const spells = require("./spellsRoute");
const monsters = require("./monstersRoute");

routes.use(express.json());

routes.get("/", homeRoute.homepageRoute);

routes.use("/spells", spells);

routes.use("/monsters", monsters);

module.exports = routes;