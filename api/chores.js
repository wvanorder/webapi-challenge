const choresRouter = require('express').Router();

let choresArr = [
    {
        id: 1,
        description: "Race my high school rival",
        notes: "He thinks I didn't beat him, but I did.",
        user_id: 1,
        completed: false
    },
    {
        id: 2,
        description: "Deliver the mail",
        notes: "Hello... Jerry.",
        user_id: 4,
        completed: false
    },
    {
        id: 3,
        description: "Dance",
        notes: ".... it's bad....",
        user_id: 5,
        completed: false
    },
    {
        id: 4,
        description: "Run the Team",
        notes: "Have I ever told you about the time I went backpacking in Watalabamba?",
        user_id: 6,
        completed: false
    },
    {
        id: 5,
        description: "Do Nothing",
        notes: "It's a show, about nothing!",
        user_id: 1,
        completed: true
    },
    {
        id: 6,
        description: "Take IQ Test",
        notes: "I have a very special brain, I'll have you know!",
        user_id: 2,
        completed: false
    },
    {
        id: 7,
        description: "Make wider lanes",
        notes: "They're Luxury Lanes, Jerry!",
        user_id: 3,
        completed: true
    }
]

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


let idNum = 8;

//get all users
choresRouter.get('/users', (req, res) => {
    res.status(200).json(userArr);
});


//get all chores
choresRouter.get('/chores', (req, res) => {
    res.status(200).json(choresArr);
})

//get chores for specific user
choresRouter.get('/chores/:id', validateUser, (req, res) => {
    console.log(req.user)
   
    if(req.user.length){
        res.status(200).json(choresArr.filter(chore => {
            return chore.user_id == req.params.id
        }));
    } else {
        res.status(404).json({ error: 'that user does NOT exist' });
    }
    
})


//post a new chore
choresRouter.post('/chores', (req, res) => {
    const newChore = {
        completed: false,
        ...req.body,
        id: idNum
    }
    if(req.body && req.body.description && req.body.user_id){
        choresArr.push(newChore);
        res.status(200).json({ your: 'new chore has been assigned'});
        idNum ++;
    } else{
        res.status(404).json({ error: 'give me what I need' });
    }
})

//delete a chore
choresRouter.delete('/chores/:id', (req, res) => {
    for(let i = 0; i < choresArr.length; i++){
        if(choresArr[i].id == req.params.id){
           choresArr.splice(i, 1); 
        }
    }
    res.status(200).json({ your: 'chore was deleted.'});
});

//update a chore
choresRouter.put('/chores/:id', (req, res) => {
    const newObj = req.body;
    console.log(newObj);
    if(req.body) {
        for(let i = 0; i < choresArr.length; i++){
            if(choresArr[i].id == req.params.id){
               choresArr[i] = {
                   ...choresArr[i],
                   description: newObj.description? newObj.description : choresArr[i].description,
                   notes: newObj.notes? newObj.notes : choresArr[i].notes,
                   user_id: newObj.user_id? newObj.user_id : choresArr[i].user_id
               }
            }
        }
        res.status(200).json({ your: 'chore was updated.'});
    } else{
        res.status(404).json({ error: 'I need something to update with' });
    }
    
})


//custom middleware for checking to make sure user id exists!
function validateUser(req, res, next) {
    req.user = userArr.filter(user => {
        return user.id == req.params.id
    });
    next();
}

module.exports = choresRouter;