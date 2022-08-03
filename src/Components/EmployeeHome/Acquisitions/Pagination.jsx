import { Pagination, PaginationItem } from '@material-ui/lab';
import { Page } from './styles';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import Stack from '@mui/material/Stack';
import { number } from 'prop-types';
import { useLocation } from "react-router-dom";

const Paginate = ({ page }) => {
    const [ props, setProps ] = useState([]);
    const [ pageKeys, setPageKeys ] = useState([]);
          // API
          const apiName = 'valproperties';
          const path = '/properties';
          // 

    let keys = [];
    const numberOfPages = Math.ceil(props.Count / 1);

    console.log(pageKeys)
    

    useEffect(() => {
        API.get(apiName, path, {
            queryStringParameters: {
                id: pageKeys.id
            }
        })
        .then(res => {
            keys.push(res.LastEvaluatedKey)
          setProps(res)})
      },[])

    return (
        <Stack>
            <Pagination count={numberOfPages} page={Number(page) || 1} renderItem={(item) => (
                <Page color='primary' {...item} component={Link} to={`/acquisitions?page=${item.page}`} />
            )}>
                
            </Pagination>
        </Stack>
    )
}

export default Paginate
