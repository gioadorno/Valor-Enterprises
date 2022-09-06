const GridAudited = (props) => (
    <div className="flex items-center justify-center gap-2">
      {props.audited === 'Yes' &&
      <p className='text-green-500'>{props.audited}</p>
      }
      {props.audited === 'In Progress' &&
      <p className='text-orange-400'>{props.audited}</p>
      }
      {props.audited === 'No' &&
      <p className='text-red-500'>{props.audited}</p>
      }
    </div>
  );

  export default GridAudited