import styled from "styled-components";
import { PaginationItem } from "@mui/material";
import { makeStyles } from "@material-ui/core";

export const Page = styled(PaginationItem)`
    background-color: #7cadff0f !important;
    border: 1px solid #1976d2;
    color: #1976d2 !important;
    

    &:hover {
        color: black !important;
        transform: scale(1.05);
        background-color: white !important;
    }
`

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      smMargin: {
        margin: theme.spacing(1),
      },
      actionDiv: {
        textAlign: 'center',
      },
      propertyContainer: {
          width: 'auto !important',
          height: 'auto !important',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      },
      loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
      },
}));