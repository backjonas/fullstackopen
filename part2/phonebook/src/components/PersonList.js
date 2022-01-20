import React from 'react'

const Person = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const PersonList = ({people, currentFilter}) => {
  const regexp = new RegExp(currentFilter, 'i')
  const peopleToShow = people.filter(person => 
                       regexp.test(person.name))

    return (
      <ul> 
        {peopleToShow.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
    )
}

export default PersonList