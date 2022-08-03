import styled from 'styled-components';
import { PaginationItem } from '@mui/material';


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
  @media ${device.mobileS} {
    background-color: #ffffffb8 !important;
    border: 1px solid #1976d2;
    color: black !important;
  }

  @media ${device.tablet} {
    background-color: #7cadff0f !important;
    border: 1px solid #1976d2;
    color: #1976d2 !important;
  }

    

    &:hover {
        color: black !important;
        transform: scale(1.05);
        background-color: white !important;
    }
`

export const MapDiv = styled.div`
@media ${device.mobileS} {
  display: flex;
  width: 100%;
  height: 30%;
  border: 2px solid black;

}

@media ${device.tablet} {
  height: 35%;
  }

  @media ${device.laptopL} {
    height: 25%;
  }
`

export const LeftMapDiv = styled.div`
@media ${device.mobileS} {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  border-right: 1px solid white;
  align-items: center;

}

@media ${device.tablet} {

  width: 40%;
  height: 130%;
  }

  @media ${device.laptopL} {
    width: 25%;
    height: 100%;
  }
`

export const PageBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    width: 100%;
    height: 55em;
    overflow-y: hidden;
`
// export const InfoDiv = styled.div`
// display: flex;
// border-box: 1px solid black;
// align-items: center;
// justify-content: flex-start;
// flex-direction: column;
// background-color: white;
// width: 15em;
// height: 20em;
// `

// export const PhotoBox = styled.div`
// width: 100%;
// height: 100%;
// display: flex;
// justify-content: center;
// align-items: center;
// `

// export const LocationPhoto = styled.img`
// width: 60%;
// height: 100%;
// border: 3px solid gray;
// `

// export const InfoAddress = styled.h1`
// font-family: monospace:
// font-size: 1.3em;
// color: black;
// `

// export const Info = styled.p`
// font-family: monospace:
// font-size: 1em;
// color: black;
// `

// export const LabelDiv = styled.div`
// display: flex;
// width: 100%;
// flex-direction: row;
// align-items: center;
// margin-left: 1em;
// height: 2em;
// `

// export const Label = styled.label`
// font-size: 1.1em;
// font-family: monospace;
// font-weight: 550;
// display: flex:
// flex-direction: row;
// `

export const Image = styled.img`
@media ${device.laptop} {
  height: 110%;
  position: absolute;
  top: -37em;
  z-index: -2;
  width: 100%;
  margin-bottom: 20em;
  opacity: .5;
}


@media ${device.laptopL} {
  height: 100%;
}
`

export const MapTitle = styled.h1`
@media ${device.mobileS} {
  position: absolute;
  display: flex;
  flexDirection: column;
  align-items: center;
  font-size: 1.8em;
  font-style: italic;
  left: 0;
  right: 99%;
  top: 0;
  height: 90%;
}

@media ${device.tablet} {
  height: auto;
  color: black;
  font-size: 2em;
  font-style: italic;
  position: absolute;
  top: -.5em;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}

@media ${device.laptopL} {

}

`


// Markers

export const InnerLeftPanel = styled.div`
display: flex;
width: 100%;
height: 100%;
align-items: center;
justify-content: center;
background-color: white;
flex-direction: column;
`

export const Photos = styled.a`
font-size: 1em;
font-family: Rubik;
font-style: italic;
`

export const TopDiv = styled.div`
display: flex;
width: 100%;
height: 25%;
align-items: center;
justify-content: flex-start;
flex-direction: column;
border-bottom: solid 1px black;
position: relative;
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
color: black;
font-style: italic;
font-family: emoji;
font-size: 1.3em;
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
font-family: emoji;
cursor: pointer;

&:hover {
    color: white;
    background-color: #1ee0ffb0;
}
`

export const H2 = styled.h2`
@media only screen and ${device.sm} {
display: none;
};

@media only screen and ${device.lg}
display: block;
color: black;
font-family: monospace;
font-style: italic;
font-size: 1.7em;
position: relative;
top: .5em;
margin-bottom: 1em;
margin-top: 0

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
width: 60%;
height: 1em;
background-color: #00b2ff2e;
`

export const InfoDiv = styled.div`
@media ${device.mobileS} {
  display: flex;
  border-box: 1px solid black;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: white;
  width: 25em;
  height: 30em;

}

@media ${device.tablet} {
  width: 30em;
  height: 34em;
}

@media ${device.laptopL} {
width: 32em;
height: 37em
}
`

export const PhotoBox = styled.div`
width: 100%;
height: 70%;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 2em;
`

export const Photo = styled.img`
width: 100%;
height: 90%;
border: 3px solid gray;
`

export const InfoAddress = styled.h1`
font-family: Rubik;
font-size: 1.3em;
color: black;
text-align: center;
margin-bottom: 2em;
width: 100%;
`

export const Info = styled.p`
font-family: Rubik:
font-size: 1em;
color: black;
margin-left: .2em
`

export const InfoLink = styled.a`
font-family: Rubik:
font-size: 1em;
margin-left: .2em

&:hover{
  color: red !important;
}
`

export const LabelDiv = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 1em;
margin-bottom: .8em;
height: 1em;
`

export const Label = styled.label`
font-size: 1em;
font-family: Rubik;
font-weight: 600;
display: flex:
flex-direction: row;
`