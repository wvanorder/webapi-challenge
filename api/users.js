const userRouter = require('express').Router();

const userArr = [
    {
        name: 'Seinfeld',
        id: 1
    },
    {
        name: 'Georgie',
        id: 2
    },
    {
        name: 'Kramer',
        id: 3
    },
    {
        name: 'Newman',
        id: 4
    },
    {
        name: 'Elaine',
        id: 5
    },
    {
        name: 'Peterman',
        id: 6
    },
];

userRouter.get('/', (req, res) => {
    res.status(200).json(userArr);
});

module.exports = userRouter;
