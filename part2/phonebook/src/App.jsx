/* eslint-disable react/prop-types */
import { useState } from 'react'

const Numbers = ({persons}) => {
  return (
    <ul style={{ listStyleType: 'none' }}>
      {persons.map((e, index) => 
      <li key={index}>
        {e.name}
      </li> )}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([{name:'Arto Hellas'}]) 
  const [newName, setNewName] = useState('')

  // handle function
  const addUser = (event) => {
    event.preventDefault();
    setPersons([...persons, {name: newName}])
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addUser}>
        <div>
          name: <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}  
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App