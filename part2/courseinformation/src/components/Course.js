import React from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>    
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((a, b) => a + b.exercises, 0)
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course