/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import PersonsService from './services/PersonsService';


// this component displays saved persons
const Persons = ({persons, filtered, removePerson}) => {
  const filteredPersons = persons.filter((person) => 
    person.name.toLowerCase().includes(filtered.toLowerCase()));
  return (
    <ul style={{ listStyleType: 'none' }}>
      {filteredPersons.map(e => 
      <li key={e.id}>
         {e.name}  {e.number} 
         <button onClick={() => removePerson(e.id)}>Delete</button>
      </li> 
      )}
    </ul>
  )
}

// filter component
const Filter = ({filtered, setFiltered}) => {
  return(
    <div>
      <input 
      type="text"
      value={filtered}
      onChange={(e) => setFiltered(e.target.value)}
      placeholder='Search...'
      />
    </div>
  )
}

// form Component
const PersonForm = ({addUser, newName, setNewName, newNumber, setNewNumber}) => {
  return(
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
  )
}


const App = () => {
  // state hooks
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFiltered] = useState('')

  // effect hooks
  useEffect(() => {
    console.log("effect")
    PersonsService.getAll()
    .then(response => {
      console.log("promise fullfilled")
      setPersons(response.data)
    })
  }, [])

  // the function adds a new person to the list
  const addUser = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Do you want to update the number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        PersonsService.update(existingPerson.id, updatedPerson).then(() => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? updatedPerson : person
            )
          );
          console.log("person's number has been updated");
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      PersonsService.create(newPerson).then((response) => {
        setPersons([...persons, response.data]);
        console.log("person has been added");
        setNewName("");
        setNewNumber("");
      });
    }
  };
  
  
  // the function deletes the specified person on the list
  const removePerson = (id) => {
    const removedPerson = persons.find(user => user.id === id)
    if (window.confirm(`Are you sure you want to delete ${removedPerson.name} permanently?`)) {
      PersonsService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        console.log("person has been removed")
      });
    }
  }
  

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filtered={filtered} setFiltered={setFiltered} />
      <h2>Add New</h2>
      <PersonForm addUser={addUser} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filtered} removePerson={removePerson} /> 
    </div>
  )
}

export default App