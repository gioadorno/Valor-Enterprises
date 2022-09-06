import { useNavigate } from "react-router-dom";

const GridAddress = (props) => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 justify-center">
      <a target='_blank' href={`https://valorenterprises.netlify.app/acquisitions/${props.id}`} style={{ fontFamily: 'Karla', color: 'navy' }} className="cursor-pointer hover:animate-pulse">{props.address.replace(', USA', '')}</a>
    </div>
  )
}

export default GridAddress