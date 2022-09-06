import React from 'react'

const GridCreateDate = (props) => {
    
  return (
    <div className="flex items-center gap-2 justify-center text-green-700">
      <p className="text-cyan-600">{props.createDate != undefined && props.createDate != '' ? new Date(props.createDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : ''}</p>
    </div>
  )
}

export default GridCreateDate