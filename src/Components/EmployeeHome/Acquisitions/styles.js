import styled from "styled-components";
import { PaginationItem } from "@mui/material";
import { makeStyles } from "@material-ui/core";

export const Page = styled(PaginationItem)`
    background-color: #e3e3e394 !important;
    border: 1px solid rgb(255 255 255 / 50%);

    &:hover {
        color: aqua;
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
          flexGrow: 1
      }
}));