import { useEffect, useState } from 'react'
import { API } from 'aws-amplify';

      // API
      const apiName = 'valproperties';
      const path = '/properties';
      // 

const usePropLoad = (pageNumber) => {
    const [ props, setProps ] = useState([]);
    useEffect(() => {
        API.get(apiName, path)
        .then(res => {
          setProps(res.Items)})
        .then(() => {
          getPageProps()
    }), [pageNumber]})

  return null
}

export default usePropLoad