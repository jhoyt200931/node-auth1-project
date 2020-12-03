const express = require('express');

const bcrypt = require('bcryptjs');
const db = require('./Users_Model.js');
const Users_Model = require('./Users_Model.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    try {
        const saved = await Users_Model.add(user);
        res.status(201).json({message: 'Account created!'})
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `There was an error in the database ${err}`});
    }
})

router.post('/login', async (req,res) => {
    let { username, password } = req.body;
    
    try {
        const user = await db.findBy({username})
        console.log(user);
        if(user && bcrypt.compareSync(password, user[0].password)) {
            req.session.user = user;
            res.status(200).json({message: `Welcome ${username}`})
        } else {
            res.status(401).json({message: 'You shall not pass!'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: `There was an error with the database ${err}`})
    }
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy((err) => {
            if(err) {
                res.status(400).json({message: 'Your soul is mine', error: err})
            } else {
                res.json({message: 'Logged out'})
            }
        })
    } else {
        res.end();
    }
})


module.exports = router;