import { StylesProvider, Modal, ButtonGroup, Button, Box, Typography } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Property from './Property/Property';
import { API } from 'aws-amplify';
import InfiniteScroll from 'react-infinite-scroller';
import { Container } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Properties = ({ setOpen }) => {

  const [ props, setProps ] = useState([]);
  const [ pageProps, setPageProps ] = useState([]);
  const [ pageNumber, setPageNumber ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ keys, setKeys ] = useState([]);
  const [ count, setCount ] = useState(''); 
  const [ more, setMore ] = useState(true);


      // API
      const apiName = 'valproperties';
      const path = '/inventory';
      const queryPath = '/inventory/pages';
      // 


      const getPageProps = async () => {
        const key = keys.at(-1)
        // const key = keys.pop();
        console.log(key)
        await API.get(apiName, queryPath, {
          queryStringParameters: {
            id: key
        }
        })
        .then(res => {
          if(res.LastEvaluatedKey){
            setProps([...props, ...res.Items ])
            setKeys(() => [...new Set([...keys, res.LastEvaluatedKey.id])])
          }
        })
        .catch(err => console.log(err))
      }



      useEffect(() => {
        API.get(apiName, path)
        .then(res => {
          setCount(res.Count)
          if(res.LastEvaluatedKey){
          setKeys(() => [...new Set([...keys, res.LastEvaluatedKey.id])])
          }
          setProps(res.Items)})
        .then(() => {
          setIsLoading(false)})
      },[])
      console.log(keys)
      console.log(count)
      
      const properties = props?.sort((a,b) => {
        return new Date(b.date) - new Date(a.date)
      })

  return (
    <>
        {isLoading ? <Stack sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 10 }}><p>Properties Loading...</p><LinearProgress sx={{ pt: 5 }} color='success' /></Stack> :
        <InfiniteScroll
        style={{ width: '100%', paddingLeft: '2em', height: '100%', display: 'flex', flexDirection: 'column' }}
        pageStart={0}
        loadMore={getPageProps}
        hasMore={true || false}
        >
          {properties?.map((prop) => (
                    <Property setOpen={setOpen} prop={prop} />
          ))}

        </InfiniteScroll>
        }
    </>
  )
}

export default Properties

