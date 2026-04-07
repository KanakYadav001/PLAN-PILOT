const issueModel = require("../models/issue.model");
const mongoose = require("mongoose");
const orgModel = require("../models/organzition.model");
const teamModel = require("../models/team.model");
const memberModel = require("../models/members.model");

async function createIssue(req, res) {
  const userId = req.userId;
  const { title, description } = req.body;

  const teamId = req.params.teamId;
  const orgId = req.params.orgId;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ message: "Invalid team ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ message: "Invalid organization ID" });
  }

  try {
    const teamExits = await teamModel.findOne({
      _id: teamId,
      organizationId: orgId,
    });

    // if the team exists in the organization
    if (!teamExits) {
      return res
        .status(404)
        .json({ message: "Team not found in the organization" });
    }

    // if the user is a member of the team
    const isMember = await memberModel.findOne({
      userId,
      organizationId: orgId,
    });

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this team" });
    }

    const issue = await issueModel.create({
      title,
      description,
      teamId,
    });

    res.status(201).json({ message: "Issue created successfully", issue });
  } catch (error) {
    console.error("Error creating issue:", error);
    return res.status(500).json({ message: "Error creating issue" });
  }
}

async function getIssues(req, res) {
  const userId = req.userId;
  const teamId = req.params.teamId;
  const orgId = req.params.orgId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ message: "Invalid team ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ message: "Invalid organization ID" });
  }

  try {
    // if the team exists in the organization
    const teamExits = await teamModel.findOne({
      _id: teamId,
      organizationId: orgId,
    });

    // if the user is a member of the team
    const isMember = await memberModel.findOne({
      userId,
      organizationId: orgId,
    });

    if (!teamExits) {
      return res
        .status(404)
        .json({ message: "Team not found in the organization" });
    }

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this team" });
    }
    const isses = await issueModel.find({ teamId }).sort({ createdAt: -1 });

    res.status(200).json({ issues: isses });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return res.status(500).json({ message: "Error fetching issues" });
  }
}

async function updateIssue(req, res) {
  const userId = req.userId;

  const { orgId, teamId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(teamId)) {
    return res.status(400).json({ message: "Invalid team ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(orgId)) {
    return res.status(400).json({ message: "Invalid organization ID" });
  }
  if (!mongoose.Types.ObjectId.isValid(issueId)) {
    return res.status(400).json({ message: "Invalid issue ID" });
  }

  try {
    // if the team exists in the organization
    const teamExits = await teamModel.findOne({
      _id: teamId,
      organizationId: orgId,
    });

    // if the user is a member of the team
    const isMember = await memberModel.findOne({
      userId,
      organizationId: orgId,
    });

    if (!teamExits) {
      return res
        .status(404)
        .json({ message: "Team not found in the organization" });
    }

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this team" });
    }

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

  const newIssueData = await issueModel.findByIdAndUpdate(issueId, req.body, { new: true });

    res.status(200).json({ message: "Issue updated successfully", issue: newIssueData });
  } catch (error) {
    console.error("Error updating issue:", error);
    return res.status(500).json({ message: "Error updating issue" });
  }
}

module.exports = {
  createIssue,
  getIssues,
  updateIssue,
};
