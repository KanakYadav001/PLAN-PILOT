const express = require("express");

const router = express.Router();

const memberController = require("../controller/member.controller");


const authMiddleware = require("../middleware/auth.middleware");

router.post("/organization/:orgId", authMiddleware, memberController.createMember);
router.delete("/organization/:orgId/:memberId", authMiddleware, memberController.deleteMember);




module.exports = router;