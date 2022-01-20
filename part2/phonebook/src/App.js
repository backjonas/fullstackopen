import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Filter from './components/Filter'

const App = () => {
  const [people, setPeople] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (people.some(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
      return
    }
    
    const personObject = { name : newName, number: newNumber }
    setPeople(people.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
        currentFilter={currentFilter} 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new person</h2>
      <PersonForm 
        onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonList 
        people={people} 
        currentFilter={currentFilter}
      />
    </div>
  )
}

export default App