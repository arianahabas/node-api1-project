import React from 'react'
import styled from 'styled-components'



const Container = styled.div`
  display: flex;
  flex-direction:column;
  border: 2px solid blue;
  height: auto;
  padding: 10px;
`

const UserCard = (props) => {
    const {users} = props

    return (
        <Container>
            <span> Name: {users.name} </span>
            <br/>
            <span> Bio: {users.bio} </span>
            <br/>
            <button>Edit</button>
        </Container>
    )
}

export default UserCard
