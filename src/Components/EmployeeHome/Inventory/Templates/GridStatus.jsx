const GridStatus = (props) => (
    <div className="flex items-center gap-2 justify-center">
    {props.propStatus === 'Active' &&
    <p className='text-green-500'>{props.propStatus}</p>
    }
    {props.propStatus === 'Pending' &&
    <p className='text-orange-400'>{props.propStatus}</p>
    }
    {props.propStatus === 'Closed' &&
    <p className='text-cyan-500'>{props.propStatus}</p>
    }
    {props.propStatus === 'Cancelled' &&
    <p className='text-rose-800'>{props.propStatus}</p>
    }
    {props.propStatus === 'Sidelined' &&
    <p className='text-blue-600'>{props.propStatus}</p>
    }
    {props.propStatus === 'Dead' &&
    <p className='text-purple-600'>{props.propStatus}</p>
    }
        {props.propStatus === 'In Progress' &&
    <p className='text-indigo-500'>{props.propStatus}</p>
    }
  </div>
  )

  export default GridStatus