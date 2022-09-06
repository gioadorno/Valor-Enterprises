import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import { TwinSpin } from 'react-cssfx-loading';

const ToDetails = () => {
    const navigate = useNavigate();
    const { address } = useParams();

        // API
        const apiName = 'valproperties';
        const path = `/properties`;

        // 

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
            navigate(`/acquisitions/${prop.id}`)
        }
    },[prop])
  return (
    loading &&
    <div className="w-full h-full xl:h-screen bg-[#0004] flex-col">
        <div className="w-full h-full xl:h-[1000px] flex items-center justify-center bg-[#0004] flex-col">
            <TwinSpin color='#a91f52' />
            <h1 className="font-semibold text-2xl text-white pt-3">Rerouting to Property Details</h1>

        </div>
    </div>
  )
}

export default ToDetails