const express = require('express');
const router = express.Router();

const fightApp = require('../app/fightApp');

router.get('/', async (req, res, next) => {
    try {
        const fights = await fightApp.getAllPublic();
        res.json({ fights });
    } catch (e) {
        next(e);
    }
});

router.get('/:fightId', async (req, res, next) => {
   try {
       const fightId = req.params.fightId;
       const fight = await fightApp.getById(fightId);
       res.json({ fight });
   } catch (e) {
       next(e);
   }
});

router.post('/:fightId/action', async (req, res, next) => {
   try {
       const fightId = req.params.fightId;
       const { actionType, targets, reactions, outputs } = req.body;
       await fightApp.doAnAction(fightId, actionType, targets, reactions, outputs);
       res.status(200).send();
   } catch (e) {
       next(e);
   }
});

module.exports = router;