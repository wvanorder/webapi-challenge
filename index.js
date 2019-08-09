const express = require('express');


const server = express();

const choresRouter = require('./api/chores');


server.use(express.json());
server.use('/api', choresRouter);


server.get('/', (req, res) => {
    res.send(`<h2>Will's first API sprint challenge, up and running!</h2>`)
});





const port = process.env.PORT || 8001;

server.listen(port, () => console.log('\n ***Theres always money in the Banana Stand!*** \n'));