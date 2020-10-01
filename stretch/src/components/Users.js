import React from 'react'
import UserCard from './UserCard'


const Users = (props) => {
    const {users} = props

    console.log('props from users component', users)
    return (
        <div>
            <h2>User List</h2>
            {users.map((person)=> {
                return (
                    
                    <UserCard key={users.id} person={person}/>
                 
                )
            })
        }
        
        </div>
    )
}

export default Users
