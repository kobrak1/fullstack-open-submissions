/* eslint-disable react/prop-types */
import { useState } from 'react'

// Numbers component
const Numbers = ({persons, filtered}) => {
  const filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(filtered.toLowerCase()));
  // console.log(filteredPersons());
  return (
    <ul style={{ listStyleType: 'none' }}>
      {filteredPersons.map(e => 
      <li key={e.name}>
         {e.name}  {e.number} 
      </li> 
      )}
    </ul>
  )
}
// filter component


const App = () => {
  const [persons, setPersons] = useState([{name:'Arto Hellas', number:'905303888230'}])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  // handle function
  const addUser = (event) => {
    event.preventDefault(); 
    // condition
    if (persons.some(person => person.name === newName)) {
      return alert(`There is already a ${newName} in the list!`)
    } else {
      setPersons([...persons, {name: newName, number: newNumber}])
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <input 
        type="text"
        value={filtered}
        onChange={(e) => setFiltered(e.target.value)}
        />
      </div>
      <h2>Add New</h2>
      <form onSubmit={addUser}>
        <div>
          name: <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}  
          />
        </div>
        <div>
          number: <input 
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} filtered={filtered} /> 
    </div>
  )
}

export default App