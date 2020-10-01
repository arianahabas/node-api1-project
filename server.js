

const express = require('express'); // import the express package
const db = require('./database')

const server = express(); // creates the server


server.use(express.json())


// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.json({message: "Hello from Express"});
});


//get all users
server.get('/users', (req,res) => {
    const users = db.getUsers()
    res.json(users)
})

//get user by id
server.get('/users/:id', (req,res) =>{
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        res.json(user)
    }else{
        res.status(404).json({
            message: "User not found",
        })
    }

    res.json(user)
})

//post new user
server.post('/users', (req,res) =>{
    const newUser = db.createUser({
        name: req.body.name,
    })
    res.status(201).json(newUser)
})

//put user
server.put('/users/:id', (req,res) =>{
    const id = req.params.id
    const user = db.getUserById(id)

    if(user){
        const updateUser = db.updateUser(id, {
            name: req.body.name,
        })
        res.json(updateUser)

    }else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

//delete user
server.delete('/users/:id', (req,res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user){
       db.deleteUser(id)

        res.status(204).end()
    }else {
        res.status(404).json({
            message: "User not found",
        })
    }
})

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('server started')
);