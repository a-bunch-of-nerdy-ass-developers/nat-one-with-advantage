const express = require('express');
const router = express.Router();

const authorization = require('../util/authorization');
const campaignApp = require('../app/campaignApp');
const fightApp = require('../app/fightApp');
const UserRole = require('../models/UserRole');


router.post('/', async(req, res, next) => {
    try {
        const {title, description, avatarUrl, isPrivate} = req.body;
        await campaignApp.createNew(title, description, avatarUrl, isPrivate);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});


router.post('/:campaignId/fight', async(req, res, next) => {
    try {
        const campaignId = req.params.campaignId;
        const {title, description, items, grid, isPrivate} = req.body;
        await fightApp.createNew(campaignId, title, description, items, grid, isPrivate);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
});

router.get('/', async(req, res, next) => {
    try {
        const campaigns = await campaignApp.getAllPublic();
        res.json({ campaigns });
    } catch (e) {
        next(e);
    }
});

module.exports = router;