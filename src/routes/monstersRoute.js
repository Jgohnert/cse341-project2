const router = require("express").Router();
const monstersController = require("../controllers/monstersController");

router.get("/", monstersController.allMonsters);

router.put("/:id", monstersController.updateMonsters);

router.delete("/:id", monstersController.deleteMonsters);

module.exports = router;