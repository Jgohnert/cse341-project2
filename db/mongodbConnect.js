require("dotenv").config();

const {
    MongoClient
} = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let _db;

async function connectDb() {
    try {
        if (_db) {
            console.log("DB is already initialized.");
            return _db;
        }

        _db = client.db("cse341-project2");
        await client.connect();

        return _db;

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

function getDb() {
    if (!_db) {
        throw Error("Database is not initialized.");
    }
    return _db;
}

module.exports = {
    getDb,
    connectDb
};