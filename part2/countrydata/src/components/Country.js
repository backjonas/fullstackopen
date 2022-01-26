import React from 'react'
import WeatherData from './WeatherData'

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(language => {
          return <li key={language[0]}>{language[1]}</li>})
        }
      </ul>
      <h1>{country.flag}</h1>
      <WeatherData country={country} />
    </div>
  )
}

export default Country