const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    title: String,
    description: String,
    avatarUrl: String,
}, {timestamps: true});

const Campaign = mongoose.model('Campaign', CampaignSchema);

module.exports = Campaign;