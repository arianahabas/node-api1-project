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
    const {user} = props

    return (
        <Container>
            <span> Name: {user.name} </span>
            <br/>
            <span> Bio: {user.bio} </span>
            <br/>
            <button>Edit</button>
        </Container>
    )
}

export default UserCard
