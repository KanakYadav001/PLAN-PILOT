const mongoose = require('mongoose');



const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    adminId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

},{timestamps: true});

const OrganizationModel = mongoose.model('Organization', OrganizationSchema);


module.exports = OrganizationModel;