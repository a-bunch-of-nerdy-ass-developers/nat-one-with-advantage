const express = require('express');
const router = express.Router();

const authorization = require('../util/authorization');
const userApp = require('../app/userApp');

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // TODO validate input from req.body
        const { token } = await userApp.login(email, password);
        res.json({ token });
    } catch(e) {
        next(e);
    }
});

router.post('/register', async(req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        // TODO validate input from req.body
        const { token } = await userApp.register(email, password, firstName, lastName);
        res.json({ token });
    } catch (e) {
        next(e);
    }
});

module.exports = router;