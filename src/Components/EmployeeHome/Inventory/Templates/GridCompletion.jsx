import React from 'react'

const GridCompletion = (props) => {
    
  return (
    <div className="flex items-center gap-2 justify-center text-green-700">
      <p className="text-cyan-600">{props.completionDate != '' && props.completionDate != undefined ? new Date(props.completionDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}</p>
    </div>
  )
}

export default GridCompletion