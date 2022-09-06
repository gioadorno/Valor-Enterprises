import { useNavigate } from "react-router-dom";

const GridDealText = (props) => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2 justify-center text-green-400">
      <a target='_blank' href={`https://valorenterprises.netlify.app/dealtext/${props.id}`} className="cursor-pointer hover:animate-pulse">Deal Text</a>
    </div>
  )
}

export default GridDealText