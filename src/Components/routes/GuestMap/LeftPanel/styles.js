import styled from 'styled-components';
import RubikMedium from '../Rubik/Rubik-VariableFont_wght.ttf';
import { Pagination, PaginationItem } from '@material-ui/lab';

export const Page = styled(PaginationItem)`
    background-color: white !important;
    border: 1px solid rgb(255 255 255 / 50%);
    color: black !important;

    &:hover {
        color: aqua !important
    }
`

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

@media ${device.tablet} {
display: flex;
width: 100%;
height: 40%;
align-items: center;
justify-content: flex-start;
flex-direction: column;
border-bottom: solid 1px black;
position: relative;
}

@media ${device.desktop} {
    height: 25%;
}
`

export const TopHeaderDiv = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: center;
flex-direction: row;
position: relative;
`

export const TopHeader = styled.h1`
@media ${device.mobileS} {
  color: black;
  font-style: italic;
  font-family: Rubik
  font-size: 1.3em;
  text-align: center;
}

@media ${device.tablet} {
  font-size: 1em;
}

@media ${device.tablet} {
  font-size: 1.3em;
}

`

export const AddressDiv = styled.form`
display: flex;
height: 3em;
width: 100%;
align-items: center;
justify-content: center;
flex-direction: column;
`

export const AddressBox = styled.input`
width: 75%;
height: 2em;
`

export const FindAddress = styled.button`
width: 8em;
margin-top: .5em;
height: 1.5em;
background-color: #f1f1f1;
font-size: 1em;
font-family: Rubik
cursor: pointer;

&:hover {
    color: white;
    background-color: #1ee0ffb0;
}
`

export const H2 = styled.h2`
@media ${device.mobileS} {
display: none;
text-align: center;
};

@media ${device.tablet} {
display: block;
color: black;
font-family: Rubik
font-style: italic;
font-size: 1.4em;
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
`

export const FilterLabel = styled.label`
color: black;
font-size: 1.2em;
font-style: italic;
font-family: Rubik
font-weight: 520;
`

export const FilterInput = styled.input`
width: 65%;
height: 1em;
background-color: white;
border: none;
border-bottom: 1px solid black;
text-align: center;
margin-top: .7em;

&:focus {
    background-color: #86cfff2b;
    outline: none;
}
`

export const InfoDiv = styled.div`
@media ${device.mobileS} {
  display: flex;
  border-box: 1px solid black;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  width: 100%;
  height: 30em;
}

@media ${device.tablet} {
  width: 25em;
  height: 40em;
}

@media ${device.laptopL} {
  width: 30em;
  height: 40em;
}

`

export const PhotoBox = styled.div`
@media ${device.mobileS} {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
  box-shadow: 1px 1px 4px 0px black;
}

@media ${device.tablet} {
  width: 100%;
  height: 50%;
}

@media ${device.laptopL} {
  width: 100%;
  height: 50%;
}

`

export const Photo = styled.img`
width: 100%;
height: 100%;
`

export const InfoAddress = styled.h1`
font-family: Rubik;
font-size: 1.2em;
width: 100%;
color: black;
text-align: center;
margin-bottom: 1em
margin-top: 0em;
`

export const Info = styled.p`
font-family: Rubik;
font-size: 1.1em;
color: black;
margin-left: .25em;
`

export const InfoLink = styled.a`
font-family: Rubik;
font-size: 1.1em;
margin-left: .25em;

`

export const LabelDiv = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 1em;
height: 2em;
`

export const Label = styled.label`
font-size: 1.1em;
font-family: Rubik;
font-weight: 550;
display: flex:
flex-direction: row;
`

export const Photos = styled.a`
font-size: 1.1em;
font-family: Rubik;
font-style: italic;
margin-left: .25em;
`