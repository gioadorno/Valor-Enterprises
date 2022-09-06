import React from 'react'

const GridIP = (props) => {
    
  return (
    <div className="flex items-center gap-2 justify-center text-green-700">
      <p className="text-cyan-600">{props.inspectionPeriod != '' && props.inspectionPeriod != undefined ? new Date(props.inspectionPeriod).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}</p>
    </div>
  )
}

export default GridIP