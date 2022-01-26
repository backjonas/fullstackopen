import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [currentFilter, setCurrentFilter] = useState('')

  const fetchCountries = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log(response)
      setCountries(response.data)
    })
  }

  useEffect(fetchCountries, [])

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
        currentFilter={currentFilter} 
        handleFilterChange={handleFilterChange}
      />
      <CountryList 
        countries={countries}
        currentFilter={currentFilter}
      />
    </div>
  )
}

export default App