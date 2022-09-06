import React from 'react'

const GridCompletion2 = (props) => {
    
  return (
    <div className="flex items-center gap-2 justify-center text-green-700">
      <p className="text-cyan-600">{props.completionDate2 != undefined && props.completionDate2 != '' ? new Date(props.completionDate2).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}</p>
    </div>
  )
}

export default GridCompletion2