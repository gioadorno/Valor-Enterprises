import { StylesProvider } from '@material-ui/core';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useSelector} from "react-redux";
import UserCard from './User/UserCard';

const Users = ({employees}) => {
    
  return (
    employees.map((employee) => (
        <StylesProvider injectFirst>
        <Grid key={employee._id} item xs={12} sm={3}>
            <UserCard employee={employee} />
        </Grid>
      </StylesProvider>
    ))
  )
}

export default Users