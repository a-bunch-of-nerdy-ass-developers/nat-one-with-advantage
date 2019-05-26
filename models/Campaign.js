const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    title: String,
    description: String,
    avatarUrl: String,
    isPrivate: { type: Boolean, default:  false },
}, {timestamps: true});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;