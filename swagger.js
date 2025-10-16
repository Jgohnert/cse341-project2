const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "D&D Spells API",
        description: "This is a Dungeons and Dragons API for spells and monster vulnerabilities."
    },
    host: "localhost:3000"
};

const outputFile = "./swagger.json";
const routes = ["./src/routes/index.js"];

swaggerAutogen(outputFile, routes, doc);