const orgModel = require("../models/organzition.model")
const mongoose = require("mongoose");
async function createOrganization(req, res) {
    const userId = req.userId;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

   if(!mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).json({ message: "Invalid user ID" });
   }


   try {
    const organization = await orgModel.create({
     name,
     description,
     adminId: userId,
    });



    res.status(201).json({ message: "Organization created successfully", organization });



   } catch (error) {
    return res.status(500).json({ message: "Error creating organization" });
   }

}

async function getAllOrganizations(req, res) {}

async function getOrganizationById(req, res) {}

async function deleteOrganization(req, res) {}






module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
};
