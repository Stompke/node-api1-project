// implement your API here
const express = require('express');
const UserFunctions = require('./data/db.js');

const server = express();
server.use(express.json());

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
        res.status(500).json({errorMessage: 'oops!'})
    })
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})