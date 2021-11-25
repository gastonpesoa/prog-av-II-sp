const loginRouter = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../utils/config')

loginRouter.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        
        const correctPass = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(user && correctPass)) {
            next({ name: "ValidationError", message: "Incorrect password or username" })
        } else {
            const userToken = {
                username: user.username,
                id: user._id
            }
            const token = await jwt.sign(userToken, PRIVATE_KEY)
            res.status(200).json({ username, token }).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter