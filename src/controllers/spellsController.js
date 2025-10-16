const mongodb = require("../../db/mongodbConnect");

//Gets all the dnd spells from a database
async function allSpells(req, res) {
    const db = mongodb.getDb();
    const spellList = await db.collection("spells").find().toArray();

    res.status(200).json(spellList);
}

//Gets all spells by their type, such as cold, fire, and acid.
//It also gets the monsters who are vulnerable to that type of magic
async function getSpellByType(req, res) {
    const db = mongodb.getDb();
    const spellType = req.params.damageType;

    const spells = await db.collection("spells").find({
        damageType: spellType
    }).toArray();

    const monsters = await db.collection("monsters").find({
        vulnerabilities: spellType
    }).toArray();

    res.status(200).json({
        spells,
        monsters
    });
}

async function addSpell(req, res) {
    const db = mongodb.getDb();

    const newInfo = {
        name: req.body.name,
        damageType: req.body.damageType,
        level: req.body.level,
        school: req.body.school,
        description: req.body.description
    };

    const spell = await db.collection("spells").insertOne(newInfo);

    res.status(201).json(spell);
    console.log("New Spell:");
    console.log(spell);
}

async function updateSpells(req, res) {}

async function deleteSpells(req, res) {}

module.exports = {
    allSpells,
    getSpellByType,
    addSpell,
    updateSpells,
    deleteSpells
};