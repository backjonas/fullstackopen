import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Temperature = ({temp}) => {
  const celsiusTemp = Math.round(temp - 273.15)
  return <p><b>Temperature: </b>{celsiusTemp} Celsius</p>
}

const Wind = ({windData}) => {
  const windSpeed = Math.round(windData.speed)
  return (
    <p>
      <b>Wind: </b>{windSpeed} m/s direction {windData.deg}°
    </p>
  )
}

const Description = ({desc}) => {
  return <p><b>Desciption: </b>{desc}</p>
}

const WeatherData = ({country}) => {
  const [weatherData, setWeatherData] = useState()
  const apiKey = process.env.REACT_APP_API_KEY
  const fetchWeatherData = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`)
    .then(response => {
      setWeatherData(response.data)
    })
  }

  useEffect(fetchWeatherData, [])

  if (!weatherData) {
    return <p><b>No weather data available for {country.capital}</b></p>
  }

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <Temperature temp={weatherData.main.temp} />
      <Wind windData={weatherData.wind} />
      <Description desc={weatherData.weather[0].description} />
    </div>
  )
}

export default WeatherData