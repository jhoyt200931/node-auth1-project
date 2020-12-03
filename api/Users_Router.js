const express = require('express');

const db = require('./Users_Model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await db.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({mesage: `There was an error with the database ${err}`})
    }
})

module.exports = router;