const express = require("express");

const router = express.Router();

const memberController = require("../controller/member.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.get("/:orgId", authMiddleware, memberController.getMembers);
router.post("/:orgId", authMiddleware, memberController.createMember);
router.delete(
  "/:orgId/:memberId",
  authMiddleware,
  memberController.deleteMember,
);

module.exports = router;
