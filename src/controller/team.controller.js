const teamModel = require("../models/team.model");
c
const orgModel = require("../models/organzition.model");
const mongoose = require("mongoose");
async function createTeam(req, res) {

    const userId = req.userId;
   const {name, description} = req.body;

   const organizationId = req.params.orgId;


    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }
    
    try{
        
        const isAdmin = await orgModel.findOne({ _id: organizationId, adminId: userId });

        if (!isAdmin) {
            return res.status(400).json({ message: "You are not the admin of this organization" });
        }


    
        const team = await teamModel.create({
            name,
            description,
            organizationId,
        });



        res.status(201).json({ message: "Team created successfully", team });




    }catch (error) {
        console.error("Error creating team:", error);
        return res.status(500).json({ message: "Error creating team" });
    }




}



async function getTeamsByOrganization(req, res) {
     const userId = req.userId;
     const teamId = req.params.teamId;

        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }



    try {

        const isMember = await memberModel.findOne({ userId, organizationId: teamId });

        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this organization" });
        }

        const teams = await teamModel.find({ organizationId: teamId });

        res.status(200).json({ message: "Teams fetched successfully", teams });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return res.status(500).json({ message: "Error fetching teams" });
    }

}


async function deleteTeam(req, res) {
       const userId = req.userId;
     const teamId = req.params.teamId;

        if (!mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ message: "Invalid team ID" });
        }



    try {

        const isMember = await memberModel.findOne({ userId, organizationId: teamId });

        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this organization" });
        }

        await teamModel.findOneAndDelete({ _id: teamId });

        res.status(200).json({ message: "Teams deleted  successfully"});
    } catch (error) {
        console.error("Error fetching teams:", error);
        return res.status(500).json({ message: "Error fetching teams" });
    }

}


async function getAllTeams(req, res) {
    const userId = req.userId;
    const organizationId = req.params.orgId;
   
    if (!mongoose.Types.ObjectId.isValid(organizationId)) {
        return res.status(400).json({ message: "Invalid organization ID" });
    }





    try {

         const isMember = await memberModel.findOne({ userId, organizationId: teamId });

        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this organization" });
        }

        const teams = await teamModel.find({ organizationId });

        res.status(200).json({ message: "Teams fetched successfully", teams });

    }catch(err){
        return res.status(500).json({ message: "Error fetching teams" });
    }






}


module.exports = {
    createTeam,
    getTeamsByOrganization,
    deleteTeam,
    getAllTeams,
}