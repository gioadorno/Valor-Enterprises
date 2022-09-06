import { useState, useEffect } from "react";
import { API } from 'aws-amplify';
import emptyPhoto from '../../Acquisitions/Property/Empty Photo.png';

const GridDetail = (props) => {
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
<table className="detailtable px-5" width="90%">
                    <colgroup>
                        <col style={{ width: "15%" }}/>
                        <col style={{ width: "20%" }}/>

                    </colgroup>
                    <tbody>
                        <tr>
                            <td rowSpan={4} style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center', padding: 20 }} className="photo">
                                <img className="rounded-full" style={{ width: '200px', height: '200px' }} src={propertyImage || emptyPhoto}/>
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Company: </span>
                                <em>Valor Enterprises</em>
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Audited: </span>
                                {props.audited}
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Market: </span>
                                {props.market}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: "500" }}> Beds: </span>
                                {props.beds}
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Baths: </span>
                                {props.baths}
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Living Area: </span>
                                {props.livingArea}
                            </td>

                        </tr>
                        <tr>
                        <td>
                                <span style={{ fontWeight: "500" }}> Lot Size: </span>
                                ${props?.lotSize?.includes('.') ? `${props?.lotSize}acres` : `${props?.lotSize}sqft`}
                            </td>
                            <td>
                            <span style={{ fontWeight: "500" }}> Pictures: </span>
                                <a className="text-cyan-300 underline hover:text-blue-500 hover:animate-pulse" href={props.pictureLink}>Photos</a>
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Date of Completion: </span>
                                {props.completionDate}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span style={{ fontWeight: "500" }}> Our Earnest Amount: </span>
                                {props.emd}
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Earnest Deposit Status: </span>
                                {props.statusEarnest}
                            </td>
                            <td>
                                <span style={{ fontWeight: "500" }}> Who Sold this Property: </span>
                                {props.whoSold}
                            </td>
                        </tr>
                    </tbody>
                </table>
  )
}

export default GridDetail