import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import emptyPhoto from '../../Acquisitions/Property/Empty Photo.png';

const GridPropertyProfile = (props) => {
    const [ propertyImage, setPropertyImage ] = useState('');

    useEffect(() => {
        if(props.propPhoto != '') {
            API.get('valproperties', '/photos', {
                queryStringParameters: {
                    propPhoto: props.propPhoto
                }
            })
            .then(url => setPropertyImage(url))
            .catch(err => console.log(err))
        }
    }, [propertyImage, props])
    return (
    <div className="flex items-center gap-2 justify-center">
      <img
        className="rounded-full w-10 h-10"
        src={propertyImage || emptyPhoto}
        
      />
    </div>
    )

};

export default GridPropertyProfile