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

//get all users or specific user

choresRouter.get('/users', (req, res) => {
    console.log(req.query.name)
        res.status(200).json(userArr);
    
});


//get all chores
choresRouter.get('/chores', (req, res) => {
    if(req.query.completed){
        res.status(200).json(choresArr.filter(chore => {
            return chore.completed === true
        }));
    } else {
        res.status(200).json(choresArr);
    }
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
    //matching user makes sure a user exists to assign that chore
    const matchingUser = userArr.filter(user => {
        console.log(user.id, req.body.user_id)
        return user.id == req.body.user_id;
    });
    console.log(matchingUser);
    if(req.body && req.body.description && req.body.user_id && matchingUser.length ){
        choresArr.push(newChore);
        res.status(200).json({ your: 'new chore has been assigned'});
        idNum ++;
    } else{
        res.status(404).json({ error: 'give me what I need' });
    }
})

//delete a chore
choresRouter.delete('/chores/:id', validateChore, (req, res) => {
    if(req.chore.length) {
        for(let i = 0; i < choresArr.length; i++){
            if(choresArr[i].id == req.params.id){
               choresArr.splice(i, 1); 
            }
        }
        res.status(200).json({ your: 'chore was deleted.'});
    } else{
        res.status(404).json({ error: 'chore does not exist' });
    }
    
});

//update a chore
choresRouter.put('/chores/:id', validateChore, (req, res) => {
    if(!req.chore.length){
        return res.status(404).json({ error: 'that chore does not exist' });
    } 
       
        const newObj = req.body;
        const matchingUser = userArr.filter(user => {
            console.log(user.id, req.body.user_id)
            return user.id == req.body.user_id? req.body.user_id : req.chore.user_id;
        });
    console.log(newObj);
    if(req.body && matchingUser.length) {
        for(let i = 0; i < choresArr.length; i++){
            if(choresArr[i].id == req.params.id){
               choresArr[i] = {
                   ...choresArr[i],
                   ...newObj
               }
            }
        }
        res.status(200).json({ your: 'chore was updated.'});
    } else{
        res.status(404).json({ error: 'I need something to update with, or a real user' });
    }
})


//custom middleware for checking to make sure user id exists!
function validateUser(req, res, next) {
    req.user = userArr.filter(user => {
        return user.id == req.params.id
    });
    next();
}

function validateChore(req, res, next) {
    req.chore = choresArr.filter(chore => {
        return chore.id == req.params.id
    });
    next();
}

module.exports = choresRouter;