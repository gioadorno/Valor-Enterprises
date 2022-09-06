import React from 'react'

const GridTC = (props) => {
  return (
    <div className="flex items-center gap-2 justify-center text-green-700">
      <p className="text-purple-600">{props.tc}</p>
    </div>
  )
}

export default GridTC