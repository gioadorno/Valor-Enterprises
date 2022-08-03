import styled from 'styled-components';
import { Pagination, PaginationItem } from '@material-ui/lab';


const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '950px',
    laptopL: '1440px',
    desktop: '1500px'
};

const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };

export const Page = styled(PaginationItem)`
    background-color: white !important;
    border: 1px solid rgb(255 255 255 / 50%);
    color: black !important;

    &:hover {
        color: aqua !important
    }
`

export const InnerLeftPanel = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
background-color: white;
flex-direction: column;
`

export const TopDiv = styled.div`
@media ${device.mobileS} {
display: flex;
width: 100%;
height: 35%;
align-items: center;
justify-content: flex-start;
flex-direction: column;
border-bottom: solid 1px black;
position: relative;
}

@media ${device.laptopL} {
    height: 25%;
}

`

export const TopHeaderDiv = styled.div`
@media ${device.mobileS} {
    display: none;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;
}

@media ${device.laptopL} {
    display: flex;
}

`

export const TopHeader = styled.h1`
color: black;
font-style: italic;
font-family: emoji;
font-size: 1.3em;
`

export const AddressDiv = styled.form`
display: flex;
height: 4em;
width: 100%;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: .2em;
`

export const AddressBox = styled.input`
width: 80%;
height: 2em;
background-color: white;
border: none;
border-bottom: 1px solid black;
text-align: center;

&:focus {
background-color: #86cfff2b;
outline: none;
}
`

export const FindAddress = styled.button`
width: 30%;
margin-top: .5em;
height: 1.5em;
background-color: white;
font-size: 1em;
font-family: emoji;
cursor: pointer;

&:hover {
    color: white;
    background-color: #1ee0ffb0;
}
`

export const H2 = styled.h2`
@media ${device.mobileS} {
display: none;
};

@media ${device.laptopL} {
display: block;
color: black;
font-family: monospace;
font-style: italic;
font-size: 1.7em;
position: relative;
top: .5em;
margin-bottom: 1em;
margin-top: 0
}

`

export const PropertyDiv = styled.div`
display: flex;
height: 100%;
width: 100%;
align-items: center;
flex-direction: row;
overflow-y: auto;
flex-wrap: wrap;
`
export const FilterDiv = styled.div`
display: flex;
height: 5em;
width: 100%;
align-items: center;
justify-content: center;
flex-direction: column;
position: relative;
margin-top: .5em;
`

export const FilterLabel = styled.label`
color: black;
font-size: 1.2em;
font-style: italic;
font-family: monospace;
font-weight: 520;
`

export const FilterInput = styled.input`
@media ${device.mobileS} {
    width: 70%;
    height: 2em;
    background-color: white;
    border: none;
    border-bottom: 1px solid black;
    text-align: center;
}

@media ${device.laptopL} {
    width: 60%;
}


&:focus {
background-color: #86cfff2b;
outline: none;
}
`

export const InfoDiv = styled.div`
display: flex;
border-box: 1px solid black;
align-items: center;
justify-content: flex-start;
flex-direction: column;
background-color: white;
width: 30em;
height: 40em;
`

export const PhotoBox = styled.div`
width: 100%;
height: 60%;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 2em;
`

export const PropertyLink = styled.p`
color: blue;
font-family: Rubik;
font-size: 1.1em;
text-decoration: underline;

&:hover {
    color: aqua;
    cursor: pointer;
}
`

export const Photo = styled.img`
width: 100%;
height: 100%;
border: 3px solid gray;
`

export const InfoAddress = styled.h1`
font-family: Rubik;
font-size: 1em;
color: black;
text-align: center;
margin-bottom: 1em;
`

export const Info = styled.p`
font-family: Rubik;
font-size: 1em;
color: black;
margin-top: 1em;
`

export const LabelDiv = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 1em;
height: 2em;
margin-top: .5em;
`

export const Label = styled.label`
font-size: 1em;
font-family: Rubik;
font-weight: 550;
display: flex:
flex-direction: row;
`