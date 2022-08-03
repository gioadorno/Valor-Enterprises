import styled from 'styled-components';
import { GoogleMap } from '@react-google-maps/api';

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

export const MapDiv = styled.div`
@media ${device.mobileS} {
  position: relative;
  display: flex;
  flex-diection: row;
  flex-wrap: wrap;
  width: 100%;
  height: 40em;
 border-top: 3px solid black;
  background-color: #f0f8ff00;
}
@media ${device.tablet} {
  display: flex;
  flex-diection: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 92vh;
}

@media ${device.laptopL} {
  display: flex;
  flex-diection: row;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
}
`

export const LeftDiv = styled.div`
@media ${device.mobileS} {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  border-right: 1px solid white;
  align-items: center;

}

@media ${device.tablet} {

  width: 45%;

  }

  @media ${device.desktop} {

    width: 30%;
  
    }
`

export const Map = styled(GoogleMap)`
@media ${device.mobileS} {
  width: 100%;
  height: '92vh';
}

@media ${device.tablet} {
  width: 80%;
  height: '119vh';
}

@media ${device.laptopL} {
  width: 80%;
  height: '92vh !important';
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

export const LogoDiv = styled.div`
display: flex;
width: 100%;
position: absolute;
height: 100%;
`

export const KeygleeLogo = styled.img`
position: relative;
bottom: 2em;
left: 24.5em;
width: 4em;
height: 4em;
z-index: 2;
`

export const InfoDiv = styled.div`
display: none;
border-box: 1px solid black;
align-items: center;
justify-content: flex-start;
flex-direction: column;
background-color: white;
width: 15em;
height: 20em;
`

export const PhotoBox = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

export const Photo = styled.img`
width: 60%;
height: 100%;
border: 3px solid gray;

`

export const InfoAddress = styled.h1`
font-family: monospace:
font-size: 1.3em;
color: black;
`

export const Info = styled.p`
font-family: monospace:
font-size: 1em;
color: black;
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
font-family: monospace;
font-weight: 550;
display: flex:
flex-direction: row;
`

export const Image = styled.img`
position: absolute;
z-index: -2;
width: 100%;
height: 100%;
margin-bottom: 20em;
opacity: .5;
top: -41.9em;
`

export const MapTitle = styled.h1`
@media ${device.mobileS} {
  display: none;
  position: absolute;
  width: 100%;
  color: black;
  font-family: Rubik;
  font-size: 1.4em;
  font-style: italic;
  text-align: center;
  font-weight: 600;
  z-index: 15;
}

@media ${device.laptop} {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

`
