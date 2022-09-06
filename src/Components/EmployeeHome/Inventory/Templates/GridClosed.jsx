const GridClosed = (props) => (
    <div className="flex items-center gap-2 justify-center">
    {props.propStatus === 'Closed' &&
    <p className='text-cyan-500'>{props.propStatus}</p>
}
</div>
  )

  export default GridClosed