import React from 'react'
import Country from './Country'

const CountryList = ({countries, currentFilter}) => {
  const regexp = new RegExp(currentFilter, 'i')
  const matchingCountries = countries.filter(country => {    
    return regexp.test(country.name.common)
  })

  if (matchingCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (matchingCountries.length > 1) {
    return (
      <div>
        {matchingCountries.map(country => 
          <p key={country.ccn3}>{country.name.common}</p>
        )}
      </div>
    )
  } else if (matchingCountries.length === 1) {
    return <Country country={matchingCountries[0]}/>
  } else {
    return (
      <p>No countries found matching the filter</p>
    )
  }
}

export default CountryList