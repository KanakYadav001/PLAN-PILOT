const orgModel = require("../models/organzition.model");
const memberModel = require("../models/members.model");
const teamsModel = require("../models/team.model");
const mongoose = require("mongoose");
async function createOrganization(req, res) {
  const userId = req.userId;
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const organization = await orgModel.create({
      name,
      description,
      adminId: userId,
    });

    res
      .status(201)
      .json({ message: "Organization created successfully", organization });
  } catch (error) {
    return res.status(500).json({ message: "Error creating organization" });
  }
}

async function getAllOrganizations(req, res) {
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const organizations = await memberModel
      .find({ userId })
      .populate("organizationId");

    console.log(organizations);

    res.status(200).json({ organizations });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return res.status(500).json({ message: "Error fetching organizations" });
  }
}

async function getOrganizationById(req, res) {
  const userId = req.userId;
  const organizationId = req.params.id;

  try {
    // if user is not a member of the organization, return 403

      const isMember = await memberModel.findOne({ userId, organizationId });


      if (!isMember) {
        return res.status(403).json({ message: "Not a member of this organization" });
      }

    const teams = await teamsModel.find({ organizationId });

    console.log(teams);

    res.status(200).json({ teams });
  } catch (error) {
    console.error("Error fetching organization:", error);
    return res.status(500).json({ message: "Error fetching organization" });
  }
}

async function deleteOrganization(req, res) {
  const userId = req.userId;
  const organizationId = req.params.id;


  try {

    const organization = await orgModel.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    if (organization.adminId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this organization" });
    }


    await teamsModel.deleteMany({ organizationId });
    await memberModel.deleteMany({ organizationId });


    res.status(200).json({ message: "Organization deleted successfully" });


  
}
catch (error) { 
  console.error("Error deleting organization:", error);
  return res.status(500).json({ message: "Error deleting organization" });
}
} 
module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
};
