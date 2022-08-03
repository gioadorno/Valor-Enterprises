import { Pagination, PaginationItem } from '@material-ui/lab';
import { Page } from './styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { number } from 'prop-types';
import { getProps } from '../../../../actions/properties';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state) => state.posts)

    useEffect(() => {
        if(page) dispatch(getProps(page));
    }, [page])

    return (
        <Pagination count={numberOfPages} page={Number(page) || 1} variant='outlined' style={{ color: 'black', zIndex: '20' }} renderItem={(item) => (
            <Page {...item} component={Link} to={`/map?page=${item.page}`} />
        )}>
            
        </Pagination>
    )
}

export default Paginate
