const router = require("express").Router();
const spellsController = require("../controllers/spellsController");

router.get("/", spellsController.allSpells);

router.get("/:damageType", spellsController.getSpellByType);

router.post("/", spellsController.addSpell);

router.put("/:id", spellsController.updateSpells);

router.delete("/:id", spellsController.deleteSpells);

module.exports = router;