// implement your API here
const express = require('express');
const cors = require('cors');
const UserFunctions = require('./data/db.js');

const server = express();
server.use(express.json());
server.use(cors())

const port = 5000;

server.get('/', (req, res) => {
    res.send('SERVER IS RUNNINNNGGG 💪');
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
        UserFunctions.insert(userInfo)
        .then(addedUser => {
            console.log(userInfo)
            res.status(201).json(addedUser)
        })
        .catch(err => {
            console.log(err)
            console.log(userInfo)
            if(!userInfo.name) {
                res.status(400).json({errorMessage: "Please provide name and bio for the user."})
            } else {
                res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
            }
        })

})

server.get('/api/users', (req, res) => {

    UserFunctions.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: 'The users information could not be retrieved.'})
    })
})

server.get('/api/users/:id', (req, res) => {
    UserFunctions.findById(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else {
            res.status(200).json(user)

        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    })
})

server.delete('/api/users/:id', (req, res) => {
    UserFunctions.remove(req.params.id)
    .then(user => {
        if(!user) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else {
            res.status(200).json(user)

        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "The user could not be removed"})
    })
})

server.put('/api/users/:id', (req, res) => {
    const updatedData = req.body;
    UserFunctions.update(req.params.id, updatedData)
    .then(user => {
        if(!user) {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        } else if(!updatedData.name || !updatedData.bio) {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        } else {
            res.status(200).json(updatedData)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({errorMessage: "The user information could not be modified."})
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})