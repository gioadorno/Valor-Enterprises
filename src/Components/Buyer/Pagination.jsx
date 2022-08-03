import { Pagination, PaginationItem } from '@material-ui/lab';
import { Page } from './styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveProps, getActiveMarkets } from '../../actions/properties';
import Stack from '@mui/material/Stack';
import { number } from 'prop-types';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state) => state.activeproperties)

    useEffect(() => {
        if(page) dispatch(getActiveProps(page));
    }, [page]);

    useEffect(() => {
        if(page) dispatch(getActiveMarkets(page));
    }, [page]);

    return (
        <Stack>
            <Pagination count={numberOfPages} page={Number(page) || 1} renderItem={(item) => (
                <Page color='primary' variant='outlined' {...item} component={Link} to={`/dashboard?page=${item.page}`} />
            )}>
                
            </Pagination>
        </Stack>
    )
}

export default Paginate
