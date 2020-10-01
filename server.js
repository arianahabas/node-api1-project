

const express = require('express'); // import the express package
const db = require('./database')

const server = express(); // creates the server
const shortid = require('shortid');

server.use(express.json())


// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.json({message: "Hello from Express"});
});


//Creates a user using the information sent inside the request body
server.post('/api/users', (req,res) =>{
  const { name, bio } = req.body

  if(name && bio) {
      const newUser = db.createUser({
          id:shortid.generate(),
          name: req.body.name,
          bio: req.body.bio,
      })
      res.status(201).json(newUser)
  } else if(!name || !bio){
      res.status(400).json({
          message: "Please provide name and bio for the user."
      })
  } else {
      res.status(500).json({
          message: "There was an error while saving the user to the database"
      })
  }
})

//Returns an array users.
server.get('/api/users', (req,res) => {
    const users = db.getUsers()
    if(users){
        res.json(users)
    } else {
        res.status(500).json({
            message: "The users information could not be retrieved."
        })
    }
})

//Returns the user object with the specified id.
server.get('/api/users/:id', (req,res) =>{
    const id = req.params.id
    const user = db.getUserById(id)

    if(user) {
        res.json(user)
    } else if (id != user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    } else {
        res.status(500).json({
            message:"The user information could not be retrieved."
        })
    }
})

//Removes the user with the specified id and returns the deleted user.
server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id
    const user = db.getUserById(id)

    if(user){
       db.deleteUser(id)

        res.status(200).json(user)
    }else if (id != user){
        res.status(404).json({
            message: "The user with the specified ID does not exist.",
        })
    } else {
        res.status(500).json({
            message:"The user could not be removed."
        })
    }
})

//Updates the user with the specified id using data from the request body. Returns the modified user
server.put('/api/users/:id', (req,res) =>{
    const id = req.params.id
    const user = db.getUserById(id)
    const { name, bio } = req.body

    if(user){
        const updateUser = db.updateUser(id, {
            // id:shortid.generate(),
            name: req.body.name,
            bio: req.body.bio,
        })
        res.status(200).json(updateUser)

    } else if (!name || !bio ){
        res.status(400).json({
            message:"Please provide name and bio for the user."
        })
    } else if (id != user){
        res.status(404).json({
            message:"The user with the specified ID does not exist."
        })
    } else {
        res.status(500).json({
            message:"The user information could not be modified."
        })
    }
})

// watch for connections on port 5000
server.listen(5000, () =>
  console.log('server started')
);



