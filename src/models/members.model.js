const mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    OrganizationId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    }



},{timestamps: true});


const MemberModel = mongoose.model('Member', memberSchema);

module.exports = MemberModel;