const router = require("express").Router();
const spellsController = require("../controllers/spellsController");
const validation = require("../../utilities/spells-validation");
const errorHandling = require("../../utilities/generalErrorHandling");

router.get("/", spellsController.allSpells);

router.get("/name/:name", spellsController.searchSpells);

router.get("/damageType/:damageType", spellsController.getSpellByType);

router.post(
    "/",
    validation.spellRules(),
    errorHandling.handleValidationErrors,
    spellsController.addSpell
);

router.put(
    "/:id",
    validation.spellRules(),
    errorHandling.handleValidationErrors,
    spellsController.updateSpells
);

router.delete("/:id", spellsController.deleteSpells);

module.exports = router;