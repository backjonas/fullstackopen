import React, { useState } from 'react'
import Country from './Country'

const CountryElement = ({country}) => {
  const [showFull, setShowFull] = useState(false)

  const showCountry = () => {
    if (showFull) {
      return <Country country={country} />
    }
  }
  
  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowFull(!showFull)}>
        {showFull ? 'hide' : 'show'}
      </button>
      {showCountry()}
    </div>
  )
}

const CountryList = ({countries}) => {
  return (
    <div>
      {countries.map(country => 
        <CountryElement key={country.ccn3} country={country}/>
      )}
    </div>
  )
}

export default CountryList