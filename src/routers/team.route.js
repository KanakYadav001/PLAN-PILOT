const router = require("express")

const teamController = require("../controller/team.controller");

const authMiddleware = require("../middleware/auth.middleware");


router.post("/organization/:orgId", authMiddleware, teamController.createTeam);
router.get("/organization/:teamId", authMiddleware, teamController.getTeamsByOrganization);
router.delete("/organization/:teamId", authMiddleware, teamController.deleteTeam);
router.get("/organization/:orgId", authMiddleware, teamController.getAllTeams);





module.exports = router;