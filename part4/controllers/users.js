const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// get all users
usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

// get a specific user
usersRouter.get('/:id', async (request, response, next) => {
    try {        
        const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1 })
        response.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

// post a new user
usersRouter.post('/', async (request, response, next) => {
    try {        
        const { username, name, password } = request.body

        if (!username || !password) {
            response.status(400).send({ error: 'username or password missing' })
        } else if (username.length < 4 || password.length < 4) {
            response.status()
        }

        const passwordHash = await bcrypt.hash(password, 10)
    
        const newUser = new User({
            username,
            name,
            passwordHash
        })

        const savedUser = await newUser.save()
        response.status(201).json(savedUser)

    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter