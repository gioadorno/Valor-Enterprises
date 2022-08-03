import { Pagination } from '@material-ui/lab';
import { Page } from './styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyerProperties } from '../../../actions/buyerproperties';
import Stack from '@mui/material/Stack';
import { number } from 'prop-types';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state) => state.buyerproperties)

    useEffect(() => {
        if(page) dispatch(getBuyerProperties(page));
    }, [page]);


    return (
        <Stack>
            <Pagination count={numberOfPages} page={Number(page) || 1} renderItem={(item) => (
                <Page color='primary' variant='outlined' {...item} component={Link} to={`/propertymap?page=${item.page}`} />
            )}>
                
            </Pagination>
        </Stack>
    )
}

export default Paginate
