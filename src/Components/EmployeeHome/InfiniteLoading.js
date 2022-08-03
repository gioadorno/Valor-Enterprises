import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InfiniteLoading = ({ getItems }) => {
    const pageToLoad = useRef(new URLSearchParams(window.location.search).get('page') || 1); /* 2 */
    const initialPageLoaded = useRef(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasNext, setHasNext] = useState(true); /* 1 */
    const [hasPrevious, setHasPrevious] = useState(() => pageToLoad.current !== 1);
    const navigate = useNavigate();

    const [ props, setProps ] = useState([]);

    // Get Properties
    const apiName = 'valproperties';
    const path = `/properties`;
     

    useEffect(() => {
        API.get(apiName, path)
        .then(res => {
          setProps(res)})
      },[])
    // 

    const loadItems = async (page, itemCombineMethod) => { 
        const data = await API.get(apiName, path)
        .then(res => {
          setProps(res)})
        setHasNext(data.totalPages > pageToLoad.current); /* 3 */
        setHasPrevious(pageToLoad.current > 1); /* 4 */
        setProps(prevItems => {
          /* 5 */
          return itemCombineMethod === 'prepend' ?
            [...data.items, ...prevItems] :
            [...prevItems, ...data.items]
        });
  };

  const loadNext = () => {
    pageToLoad.current = Number(pageToLoad.current) + 1;
    navigate(`?page=${pageToLoad.current}`);
    loadItems(pageToLoad.current, 'append');
  };

  const loadPrevious = () => {
    pageToLoad.current = Number(pageToLoad.current) - 1;
    navigate(`?page=${pageToLoad.current}`);
    loadItems(pageToLoad.current, 'prepend');
  };

  useEffect(() => {
    if (initialPageLoaded.current) {
      return;
    }

    loadItems(pageToLoad.current, 'append');
    initialPageLoaded.current = true;
  }, [loadItems])

  return (
    props,
    hasNext,
    hasPrevious,
    loadNext,
    loadPrevious
  )
}

export default InfiniteLoading