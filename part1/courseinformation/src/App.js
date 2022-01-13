import React from 'react'

const Header = (prop) => {
  return (
    <h1>{prop.course.name}</h1>
  )
}

const Part = (prop) => {
  return (
    <p>
      {prop.part.name} {prop.part.exercises}
    </p>
  )
}

const Content = (prop) => {
  return (
    <div>
      {prop.course.parts.map(part => <Part part={part} />)}
    </div>    
  )
}

const Total = (prop) => {
  return (
    <p>Number of exercises {prop.course.parts.reduce((a, b) => a + b.exercises, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App