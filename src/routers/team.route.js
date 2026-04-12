const express = require("express");

const router = express.Router();

const teamController = require("../controller/team.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/:orgId", authMiddleware, teamController.createTeam);
router.get(
  "/:orgId/:teamId",
  authMiddleware,
  teamController.getTeamsByOrganization,
);
router.delete("/:orgId/:teamId", authMiddleware, teamController.deleteTeam);
router.get("/:orgId", authMiddleware, teamController.getAllTeams);

module.exports = router;
