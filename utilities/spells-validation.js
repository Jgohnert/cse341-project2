const {
    body,
} = require("express-validator");

function spellRules() {
    return [
        body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide a spell name.")
        .isLength({
            min: 3
        }).withMessage("The name of the spell must exceed at least 3 characters."),

        body("damageType")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide a spell damage type.")
        .isLength({
            min: 3
        }).withMessage("The damage of the spell must exceed at least 3 characters."),

        body("level")
        .trim()
        .isInt({
            min: 1
        })
        .withMessage("The spell's level must be a whole number that exceeds 0."),

        body("school")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide the school of the spell.")
        .isLength({
            min: 3
        }).withMessage("The school of the spell must exceed at least 3 characters."),

        body("description")
        .notEmpty().withMessage("Please provide a description of the spell.")
        .isLength({
            max: 500
        }).withMessage("description of the spell can't exceed 500 characters.")

    ]
}

module.exports = {
    spellRules,
}