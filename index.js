// implement your API here
const express = require('express');

const server = express();
const port = 5000;

server.get('/', (req, res) => {
    res.send('SERVER IS RUNNINNNGGG 💪');
})

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
})