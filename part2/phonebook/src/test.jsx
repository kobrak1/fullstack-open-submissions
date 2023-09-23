/* eslint-disable react/prop-types */
import { useState } from 'react';

const Numbers = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul style={{ listStyleType: 'none' }}>
      {filteredPersons.map((e) => (
        <li key={e.name}>
          {e.name} - {e.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '905303888230' },
    { name: 'John Doe', number: '1234567890' },
    { name: 'Jane Smith', number: '9876543210' },
    // Add more persons here
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  // handle function
  const addUser = (event) => {
    event.preventDefault();
    // condition
    if (persons.some((person) => person.name === newName)) {
      return alert(`There is already a ${newName} in the list!`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name:
        <input
          type='text'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <form onSubmit={addUser}>
        <div>
          name:{' '}
          <input
            type='text'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            type='text'
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} />
    </div>
  );
};

export default App;
