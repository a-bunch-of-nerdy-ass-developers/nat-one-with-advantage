const express = require('express');
const router = express.Router();

const authorization = require('../util/authorization');
const campaignApp = require('../app/campaignApp');
const fightApp = require('../app/fightApp');
const UserRole = require('../models/UserRole');


router.post('/', authorization(UserRole.USER), async(req, res, next) => {
    try {
        const {title, description, avatarUrl} = req.body;
        await campaignApp.createNew(title, description, avatarUrl);
        res.status(200);
    } catch(e) {
        next(e);
    }
});


router.post('/:campaignId/fight', authorization(UserRole.USER), async(req, res, next) => {
    try {
        const {title, description} = req.body;
        await fightApp.createNew(title, description);
        res.status(200);
    } catch(e) {
        next(e);
    }
});