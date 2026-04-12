const express = require("express");
const router = express.Router();
const issueController = require("../controller/issue.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/:orgId/:teamId", authMiddleware, issueController.createIssue);
router.get("/:orgId/:teamId", authMiddleware, issueController.getIssues);
router.put(
  "/:orgId/:teamId/:issueId",
  authMiddleware,
  issueController.updateIssue,
);

module.exports = router;
