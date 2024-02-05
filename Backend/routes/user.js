const express = require("express");
const { register,
    activateAccount,
    login,
    resendVerification,
    checkifverfied,
    validateResetCode,
    getProfile} = require("../controllers/user");
const { authUser } = require("../middleware/auth");
const router = express.Router();



router.post("/register", register);
router.post("/activate",authUser, activateAccount);
router.post("/login", login);
router.post("/resendVerification",authUser, resendVerification);
router.post("/checkifverfied",authUser, checkifverfied);
router.post("/validateResetCode", validateResetCode);
router.get("/getProfile/:username",authUser, getProfile);


module.exports = router;
