const router = require("express").Router();
const monstersController = require("../controllers/monstersController");
const validation = require("../../utilities/monsters-validation");
const errorHandling = require("../../utilities/generalErrorHandling");

router.get("/", monstersController.allMonsters);

router.post(
    "/",
    validation.monsterRules(),
    errorHandling.handleValidationErrors,
    monstersController.addMonster
);

router.put(
    "/:id",
    validation.monsterRules(),
    errorHandling.handleValidationErrors,
    monstersController.updateMonsters
);

router.delete("/:id", monstersController.deleteMonsters);

module.exports = router;