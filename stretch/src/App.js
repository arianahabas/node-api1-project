import React, {useState} from 'react';
import axios from 'axios'
import styled from 'styled-components'
import Users from './components/Users'

const Container = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  border: 2px solid grey;
  height: auto;
  padding: 25px;
  
  button{
    width: 30vw;
  }

  h2{
  color:blue;
  text-align:center;
}
 
`

const initialState = [{
  name: 'ari',
  bio: 'habas'
}]

function App() {
  const [users, setUsers] = useState(initialState)

  
   const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
    // .then(res => res.json())
    .then(res => {
      setUsers(res.data)
      console.log("check it out", res.data)
    })
    .catch(err => {
      console.log("nope", err)
    })
  }
 

  const onClick = (e) => {
    e.preventDefault()
    fetchUsers()
  }
  console.log(users)

  return (
  
  <Container>
   <button onClick={onClick}>See users</button>

    <Users users={users}/>
  </Container>
    
  );

}

export default App;
