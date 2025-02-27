const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const { 
    createAccount, 
    login, 
    getUser,
    logout,
    checkAuth
} = require("../controllers/controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", authMiddleware, getUser);
router.post("/logout", logout);
router.get('/checkAuth', checkAuth);

module.exports = router;