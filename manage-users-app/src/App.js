import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [ users, setUsers ] = useState([])
  const [ updatedUser, setUpdatedUser ] = useState({
    name: '',
    bio: ''
  })
  const [ selectedUser, setSelectedUser ] = useState(null)
  const [ toggle, setToggle ] = useState(false);


useEffect(() => {
    axios
    .get('http://localhost:5000/api/users')
    .then(res => {
      console.log(res)
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
},[])

const deleteUser = id => {
  axios
  .delete(`http://localhost:5000/api/users/${id}`)
  .then(res => {
    console.log(res)
    axios
    .get('http://localhost:5000/api/users')
    .then(res => {
      console.log(res)
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
  })
}

const onChangeHandler = e => {
  e.preventDefault();
  setUpdatedUser({
    ...updatedUser,
    [e.target.name]: e.target.value
  })
}

const toggleHandler = id => {
  // setToggle(!toggle)
  setSelectedUser(id)
}



const hiddenStuff = <div><h1>Change This user: {selectedUser}</h1><input style={{margin: 10}} name='name' type='text' onChange={onChangeHandler} value={updatedUser.name} /><input style={{margin: 10}} name='bio' type='text' onChange={onChangeHandler} value={updatedUser.bio} /><button  type='submit'>go</button></div>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!toggle ? hiddenStuff : ''}
  {users.map(user => 
    <div onClick={() => toggleHandler(user.id)} style={{background: 'orange', padding: 10, margin: 10, borderRadius: 5}}>
      <p onClick={() => deleteUser(user.id)}>x</p>
      <h2 key={user.id}>{user.name}</h2>
      <h3>{user.bio}</h3>
    </div>
    )}
      </header>
    </div>
  );
}

export default App;
