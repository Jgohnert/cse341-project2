const mongodb = require("../../db/mongodbConnect");
const ObjectId = require("mongodb").ObjectId;

//Gets all the dnd spells from a database
async function allSpells(req, res) {
    const db = mongodb.getDb();
    const spellList = await db.collection("spells").find().toArray();

    if (!spellList || spellList.length === 0) {
        res.status(400).json({
            message: "Spell not found."
        });
    }

    res.status(200).json(spellList);
}

//Gets all spells by their type, such as cold, fire, and acid.
//It also gets the monsters who are vulnerable to that type of magic
async function getSpellByType(req, res) {
    const db = mongodb.getDb();
    const spellType = req.params.damageType.toLowerCase();
    const validDamageTypes = [
        "fire",
        "poison",
        "cold",
        "acid",
        "necrotic",
        "radiant",
        "psychic",
        "thunder"
    ];

    if (!validDamageTypes.includes(spellType)) {
        return res.status(400).json({
            message: "Use a valid spell type. (fire, poison, cold, etc)"
        });
    }

    const spells = await db.collection("spells").find({
        damageType: {
            // Matches both upper and lower case pattern in the document.
            $regex: new RegExp(spellType, "i")
        }
    }).toArray();

    const monstersVulnerabilities = await db.collection("monsters").find({
        vulnerabilities: {
            $regex: new RegExp(spellType, "i")
        }
    }).toArray();

    const monstersImmunities = await db.collection("monsters").find({
        immunity: {
            $regex: new RegExp(spellType, "i")
        }
    }).toArray();

    res.status(200).json({
        spells,
        monstersVulnerabilities,
        monstersImmunities
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

    if (spell.acknowledged) {
        res.status(201).json(spell);
        console.log("New Spell:");
        console.log(spell);
    } else {
        res.status(500).json({
            message: "Failed to create spell."
        });
    }
}

async function updateSpells(req, res) {
    const db = mongodb.getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Use a valid id."
        });
    }

    const spellId = new ObjectId(id);

    const updatedInfo = {
        name: req.body.name,
        damageType: req.body.damageType,
        level: req.body.level,
        school: req.body.school,
        description: req.body.description
    };

    const spell = await db.collection("spells").replaceOne({
        _id: spellId
    }, updatedInfo);

    if (spell.modifiedCount > 0) {
        res.status(204).send();
        console.log("Updated Spell:");
        console.log(updatedInfo);
    } else {
        res.status(500).json({
            message: "Failed to update spell."
        });
    }
}

async function deleteSpells(req, res) {
    const db = mongodb.getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Use a valid id."
        });
    }

    const spellId = new ObjectId(id);

    const spell = await db.collection("spells").deleteOne({
        _id: spellId
    });

    if (spell.deletedCount > 0) {
        res.status(200).send();
        console.log("Deleted Spell:");
        console.log(spell);
    } else {
        res.status(500).json({
            message: "Failed to delete spell."
        });
    }
}

module.exports = {
    allSpells,
    getSpellByType,
    addSpell,
    updateSpells,
    deleteSpells
};