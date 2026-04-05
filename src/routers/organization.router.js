const express = require('express');
const OrganizationController = require('../controller/organization.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/', authMiddleware, OrganizationController.createOrganization)
router.get('/', authMiddleware, OrganizationController.getAllOrganizations)  
router.get('/:id', authMiddleware, OrganizationController.getOrganizationById)
router.delete('/:id', authMiddleware, OrganizationController.deleteOrganization)

module.exports = router;    