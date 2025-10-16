const mongodb = require("../../db/mongodbConnect");

//Gets all the dnd monsters from a database
async function allMonsters(req, res) {
    const db = mongodb.getDb();
    const monsterList = await db.collection("monsters").find().toArray();

    res.status(200).json(monsterList);
}

async function updateMonsters(req, res) {}

async function deleteMonsters(req, res) {}

module.exports = {
    allMonsters,
    updateMonsters,
    deleteMonsters
};