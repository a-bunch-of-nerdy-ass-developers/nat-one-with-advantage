const express = require('express');
const router = express.Router();

const authorization = require('../util/authorization');
const campaignApp = require('../app/campaignApp');
const fightApp = require('../app/fightApp');
const UserRole = require('../models/UserRole');


router.post('/', authorization([UserRole.USER]), async(req, res, next) => {
    try {
        const {title, description, avatarUrl, isPrivate} = req.body;
        await campaignApp.createNew(title, description, avatarUrl, isPrivate);
        res.status(200);
    } catch (e) {
        next(e);
    }
});


router.post('/:campaignId/fight', authorization([UserRole.USER]), async(req, res, next) => {
    try {
        const {title, description, isPrivate} = req.body;
        await fightApp.createNew(title, description, isPrivate);
        res.status(200);
    } catch (e) {
        next(e);
    }
});

router.get('/', authorization([UserRole]), async(req, res, next) => {
    try {
        const campaigns = await campaignApp.getAllPublic();
        res.json({ campaigns });
    } catch (e) {
        next(e);
    }
});

router.get('/fight', authorization([UserRole.USER]), async(req, res, next) => {
   try {
       const fights = await fightApp.getAllPublic();
       res.json({ fights });
   } catch (e) {
       next(e);
   }
});