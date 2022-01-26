import React from 'react'

const Filter = ({currentFilter, handleFilterChange}) => {
    return (
      <div>
        Find Countries
        <input 
          value={currentFilter}
          onChange={handleFilterChange}
        />
      </div>
    )
}

export default Filter