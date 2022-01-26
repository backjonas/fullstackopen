import React from 'react'
import Country from './Country'
import CountryList from './CountryList'

const FilteredCountries = ({countries, currentFilter}) => {
  const regexp = new RegExp(currentFilter, 'i')
  const matchingCountries = countries.filter(country =>    
    regexp.test(country.name.common)
  )

  if (matchingCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (matchingCountries.length > 1) {
    return <CountryList countries={matchingCountries}/>
  } else if (matchingCountries.length === 1) {
    return <Country country={matchingCountries[0]}/>
  } else {
    return <p>No countries found matching the filter</p>
  }
}

export default FilteredCountries