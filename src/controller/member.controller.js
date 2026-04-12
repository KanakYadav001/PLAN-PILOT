const memberModel = require("../models/members.model");
const organizationModel = require("../models/organzition.model");
const mongoose = require("mongoose");

async function getMembers(req, res) {
  const organizationId = req.params.orgId;

  if (!mongoose.Types.ObjectId.isValid(organizationId)) {
    return res.status(400).json({ message: "Invalid Organization ID" });
  }

  try {
    const members = await memberModel
      .find({ organizationId })
      .populate("userId", "name email");
    return res.status(200).json({ members });

    return res.status(200).json({ members });
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({ message: "Error fetching members" });
  }
}

async function createMember(req, res) {
  const userId = req.userId;
  const organizationId = req.params.orgId;
  const memberUserId = req.body.memberId;

  if (!userId || !organizationId) {
    return res
      .status(400)
      .json({ message: "User ID and Organization ID are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(organizationId)) {
    return res
      .status(400)
      .json({ message: "Invalid User ID or Organization ID" });
  }

  try {
    //if user is admin of the organization, return 400
    const isAdmin = await organizationModel.findOne({
      _id: organizationId,
      adminId: userId,
    });

    if (!isAdmin) {
      return res
        .status(400)
        .json({ message: "You are not the admin of this organization" });
    }

    // if member already exists, return 400
    const existingMember = await memberModel.findOne({
      userId: memberUserId,
      organizationId,
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ message: "Member already exists in this organization" });
    }

    console.log(memberUserId);
    const member = await memberModel.create({
      userId: memberUserId,
      organizationId,
    });
    return res
      .status(201)
      .json({ message: "Member created successfully", member });
  } catch (error) {
    console.error("Error creating member:", error);
    return res.status(500).json({ message: "Error creating member" });
  }
}

async function deleteMember(req, res) {
  const userId = req.userId;
  const memberId = req.params.memberId;
  const organizationId = req.params.orgId;

  if (!userId || !memberId || !organizationId) {
    return res
      .status(400)
      .json({ message: "User ID, Member ID and Organization ID are required" });
  }

  if (
    !mongoose.Types.ObjectId.isValid(organizationId) ||
    !mongoose.Types.ObjectId.isValid(memberId)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid User ID, Member ID or Organization ID" });
  }

  try {
    const isAdmin = await organizationModel.findOne({
      _id: organizationId,
      adminId: userId,
    });

    const isSameUser = await memberModel.findOne({ _id: memberId, userId });

    if (isAdmin || isSameUser) {
      const deletedMember = await memberModel.findByIdAndDelete(memberId);

      if (!deletedMember) {
        return res.status(404).json({ message: "Member not found" });
      }

      res.status(200).json({ message: "Member deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this member" });
    }
  } catch (err) {
    console.error("Error deleting member:", err);
    return res.status(500).json({ message: "Error deleting member" });
  }
}

module.exports = {
  createMember,
  deleteMember,
  getMembers,
};
