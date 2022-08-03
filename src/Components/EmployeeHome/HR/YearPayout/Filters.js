import { Box, FormControl, MenuItem, Select, Typography, InputLabel, Container, Checkbox, ListItemText, OutlinedInput } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Filters = ({ employees, filterEmployees, setFilterEmployees }) => {

    const changeEmployees = (e) => {
        const {
          target: { value },
        } = e;
        setFilterEmployees(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'white', boxShadow: 5, borderRadius: '1em'  }} maxWidth='md'>
        <Typography sx={{ pr: 4 }} variant='h5'>Filters:</Typography>
        <FormControl sx={{ width: '50%', ml: 3 }}>
            <InputLabel id='selectEmployee'>Employees</InputLabel>
            <Select onChange={changeEmployees} id='selectEmployee' multiple value={filterEmployees} input={<OutlinedInput label='Employees' />} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps} >
                {employees.map(employee => (
                    <MenuItem key={employee + 1} value={employee}>
                        <Checkbox checked={filterEmployees.indexOf(employee) > -1} />
                        <ListItemText primary={employee} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Container>
  )
}

export default Filters