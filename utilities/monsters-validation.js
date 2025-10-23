const {
    body,
    validationResult
} = require("express-validator");

function monsterRules() {
    return [
        body("name")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide the monster's name.")
        .isLength({
            min: 3
        }).withMessage("The name of the monster must exceed at least 3 characters."),

        body("type")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide the monster type.")
        .isLength({
            min: 3
        }).withMessage("The monster type must exceed at least 3 characters."),

        body("hp")
        .trim()
        .isInt({
            min: 1
        }).withMessage("The monster's hp must be a whole number that exceeds 0."),

        body("armor")
        .trim()
        .isInt({
            min: 1
        }).withMessage("The monster's armor class must be a whole number that exceeds 0."),

        body("vulnerabilities")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide the monster's vulnerability.")
        .isLength({
            min: 3
        }).withMessage("The monster's vulnerability must exceed at least 3 characters."),

        body("immunity")
        .trim()
        .escape()
        .notEmpty().withMessage("Please provide the monster's immunity.")
        .isLength({
            min: 3
        }).withMessage("The monster's immunity must exceed at least 3 characters."),
    ]
}

module.exports = {
    monsterRules
}