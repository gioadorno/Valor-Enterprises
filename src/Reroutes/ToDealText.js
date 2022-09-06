import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import { TwinSpin } from 'react-cssfx-loading';

        // API
        const apiName = 'valproperties';
        const path = `/properties`;

        // 
        
const ToDealText = () => {
    const navigate = useNavigate();
    const { address } = useParams();
    const [ loading, setLoading ] = useState(false);
    const [ prop, setProp ] = useState('');
    const loadReroute = async () => {
        setLoading(true)
        await API.get(apiName, path)
        .then(res => res.Items.map(prop => prop.address === address && setProp(prop)))
    };

    useEffect(() => {
        loadReroute()
    },[])

    useEffect(() => {
        if (prop != '') {
            navigate(`/dealtext/${prop.id}`)
        }
    },[prop])
  return (
    loading &&
    <div className="w-full h-full xl:h-screen bg-[#0004] flex-col">
        <div className="w-full h-full xl:h-[1000px] flex items-center justify-center bg-[#0004] flex-col">
            <TwinSpin color='#a91f52' />
            <h1 className="font-semibold text-2xl text-white pt-3">Rerouting to Deal Text</h1>

        </div>
    </div>
  )
}

export default ToDealText