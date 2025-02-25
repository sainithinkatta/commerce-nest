const express = require("express");

const { 
    createAccount, 
    login, 
    getUser
} = require("../controllers/controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", getUser)

module.exports = router;