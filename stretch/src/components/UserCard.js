import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const Container = styled.div`
  display: flex;
  flex-direction:column;
  border: 2px solid blue;
  height: auto;
  padding: 10px;
`
const Form = styled.form`
    padding: 20px;


`
const initialUser = {
    name: '',
    bio: '',
}



const UserCard = (props) => {
    const {person} = props
    const [userToEdit, setUserToEdit] = useState(initialUser)
    const [editing, setEditing] = useState(false)
    const [allUsers, setAllUsers] = useState([])
    const [open, setOpen] = useState(false)



    const editTask = (t) => {
        setEditing(true)
        setUserToEdit(person)
    }

    const handleChange = (e) =>{
        e.persist()
        setUserToEdit ({...userToEdit, [ e.target.name]: e.target.value })
    }



    const saveEdit = (e) =>{
        e.preventDefault()
        const edit ={
            name: userToEdit.name,
            bio: userToEdit.bio,
        }

        console.log('this is what im sending to backend', edit)

        axios.put(`http://localhost:5000/api/users/${person.id}`, edit)
        .then(res => {
            console.log('SUCCESS', res)
            setUserToEdit({
                name: res.data.name,
                bio: res.data.bio
            })
            setEditing(false)
           
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const deleteUser = (e) => {
        axios.delete(`http://localhost:5000/api/users/${person.id}`)
        .then(res =>{
            console.log('oh yeah', res)
            setAllUsers(allUsers.filter((item) => item.id !== person.id))
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <Container>
            <span> Name: {person.name} </span>
            <br/>
            <span> Bio: {person.bio} </span>
            <br/>
            <button onClick ={() => setOpen(true)}>Edit</button>
            
                <Modal open={open} onClose={() =>setOpen(false)} center>
                <h4>Edit User Information</h4>
                <Form onSubmit={saveEdit}>
                    <p>
                    <label htmlFor='name'>Name
                    <input 
                    type="text"
                    name='name'
                    value={userToEdit.name}
                    onChange={handleChange}
                    placeholder='Full Name'
                    />
                    </label>
                    </p>
                    <p>
                    <label htmlFor='bio'>Bio
                     <input 
                    type="text"
                    name='bio'
                    value={userToEdit.bio}
                    onChange={handleChange}
                    placeholder='Bio'
                    />
                    </label>
                    </p>
                    <br/>
                    <button>Update</button>
                </Form>
                </Modal>
           
            <button onClick={deleteUser}>Delete User</button>
        </Container>
    )
}

export default UserCard
