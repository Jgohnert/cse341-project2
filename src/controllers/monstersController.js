const mongodb = require("../../db/mongodbConnect");
const ObjectId = require("mongodb").ObjectId;

//Gets all the dnd monsters from a database
async function allMonsters(req, res) {
    const db = mongodb.getDb();
    const monsterList = await db.collection("monsters").find().toArray();

    if (!monsterList || monsterList.length === 0) {
        res.status(400).json({
            message: "Monster not found."
        });
    }

    res.status(200).json(monsterList);
}

async function addMonster(req, res) {
    const db = mongodb.getDb();

    const newInfo = {
        name: req.body.name,
        type: req.body.type,
        hp: req.body.hp,
        armor: req.body.armor,
        vulnerabilities: req.body.vulnerabilities,
        immunity: req.body.immunity
    };

    const monster = await db.collection("monsters").insertOne(newInfo);

    if (monster.acknowledged) {
        res.status(201).json(monster);
        console.log("New Monster:");
        console.log(monster);
    } else {
        res.status(500).json({
            message: "Failed to create monster."
        });
    }
}

async function updateMonsters(req, res) {
    const db = mongodb.getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Use a valid id."
        });
    }

    const monsterId = new ObjectId(id);

    const updatedInfo = {
        name: req.body.name,
        type: req.body.type,
        hp: req.body.hp,
        armor: req.body.armor,
        vulnerabilities: req.body.vulnerabilities,
        immunity: req.body.immunity
    };

    const monster = await db.collection("monsters").replaceOne({
        _id: monsterId
    }, updatedInfo);

    if (monster.modifiedCount > 0) {
        res.status(204).send();
        console.log("Updated Monster:");
        console.log(updatedInfo);
    } else {
        res.status(500).json({
            message: "Failed to update monster."
        });
    }
}

async function deleteMonsters(req, res) {
    const db = mongodb.getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Use a valid id."
        });
    }

    const monsterId = new ObjectId(id);

    const monster = await db.collection("monsters").deleteOne({
        _id: monsterId
    });

    if (monster.deletedCount > 0) {
        res.status(200).send();
        console.log("Deleted Monster:");
        console.log(monster);
    } else {
        res.status(500).json({
            message: "Failed to delete Monster."
        });
    }
}

module.exports = {
    allMonsters,
    addMonster,
    updateMonsters,
    deleteMonsters
};