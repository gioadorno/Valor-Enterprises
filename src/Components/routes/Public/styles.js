import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';


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

export const CloseForm = styled(CloseIcon)`
color: black;
height: 2em; 
width: 2em;
font-size: 2em !important; 
z-index: 12;
position: absolute;
left: 0em;
top: 0em;


&:hover {
    color: red;
    cursor: pointer;
}
`


export const PageBody = styled.div`

@media ${device.tablet} {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
overflow-x: hidden;
width: 100%;
height: 65em;
overflow-y: hidden;
};

@media ${device.desktop} {
height: 85em;
}
`

export const Img = styled.img`
opacity: .5;
top: -12em;
position: fixed;
`

export const TopDiv = styled.div`
@media ${device.mobileS} {
display: flex;
width: 100%;
flex: 1;
flex-direction: column;
background-color: #00000082;
border-bottom: black;
justify-content: flex-start;
align-items: center;
}

@media ${device.tablet} {

}

@media ${device.laptopL} {


}
`

export const TopDivBox = styled.div`

@media ${device.mobileS} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    border-bottom: 3px solid white;
}

@media ${device.tablet} {

    width: 60%;
    height: 40%;

}

@media ${device.laptopL} {

    height: 42%;
}
`

export const Motto = styled.h1`
@media ${device.mobileS} {
    color: white;
    font-weight: 550;
    font-family: Rubik
    text-align : center;
}

@media ${device.tablet} {
    margin-top : 1em;
    font-size : 2.5em;
}

@media ${device.laptopL} {
    font-size : 2.5em;
}

`

export const Motto2 = styled.h1`
@media ${device.mobileS} {
    color: #2DA2DC;
    font-weight: 550;
    @font-face {
        font-family: Rubik;
        src: url('./Rubik//Rubik-VariableFont_wght.ttf');
      }
    text-align: center;
}

@media ${device.tablet} {

    margin-top: 2em;
    font-size: 2.2em;
}

@media ${device.laptopL} {
    margin-top: 2em;
    font-size: 2.5em;
}
`


export const SecondDiv = styled.div`
@media ${device.mobileS} {
display: flex;
width: 100%;
flex: 1.5;
flex-direction: column;
background-color: white;
border-bottom: black;
}

@media ${device.tablet} {
    flex: 1.25;
height: 30%;
flex-direction: row;
}

@media ${device.laptopL} {
    height: 100%;
flex-direction: row;
height: 20%;
flex: 1.2;
}
`

export const SecondDivLeft = styled.div`
@media ${device.mobileS} {
    display: flex;
    width: 100%;
    flex: 1;
    flex-direction: column;
    background-color: white;
    border-right: black;
    justify-content: flex-start;
    align-items: center;
    z-index: 2;
    overflow-y: auto;
    }
    
    @media ${device.tablet} {
    
    
    }
    
    @media ${device.laptopL} {
    
    
    }
`

export const SecondDivRight = styled.div`
@media ${device.mobileS} {
    display: flex;
    width: 100%;
    flex: 2;
    flex-direction: column;
    background-color: #00000082;
    justify-content: flex-start;
    align-items: center;
    z-index: 1
    }
    
    @media ${device.tablet} {
    
    
    }
    
    @media ${device.laptopL} {
    
    
    }
`

export const SecondRowImage = styled.img`
width: 100%;
height: 100%;
`

export const Image = styled.img`
@media ${device.mobileS} {
    z-index: -10;
    width: inherit;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: contrast(0.8)
}

@media ${device.tablet} {
    height: -webkit-fill-available;
    width: 100%;

}
`

export const DescriptionTitle = styled.h1`
color: black;
width: 100%;
text-align: center;
font-size: 2em;
text-decoration: underline;
letter-spacing: 1px;
font-family: Rubik
`

export const CompanyDescription = styled.p`
width: 100%;
text-align: center;
margin-top: 1em;
font-size: 1.2em;
font-family: Rubik

`

export const SellProperty = styled.p`
margin-top: 7.5em;
z-index: 12;
bottom: 0em;
left: 0em;
width: 100%;
text-align: center;
font-size: 1.2em;
color: white;
font-family: Rubik
`

export const SellForm = styled.form`
@media ${device.mobileS} {
    position: fixed;
    z-index: 15;
    background-color: #f6fbff;
    box-shadow: 1px 0px 3px 0px black;
    display: flex;
    width: 100%;
    height: 90%;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
    justify-content: flex-start;
    top: 0em;
    border-radius: 2%;
}

@media ${device.tablet} {
    width: 50%;
    height: 100%;
}

@media ${device.laptopL} {
    width: 45%;
    height: 80%;
    top: 4.5em;
}

`

export const ButtonDiv = styled.div`
width: 100%;
height: 5em;
display: flex;
justify-content: center;
align-items: center;
margin-top: 1.5em;
padding-bottom: 3em;
`

export const Button = styled.button`
@media ${device.mobileS} {
    width: 30%;
    height 100%;
    background-color: white;
}

@media ${device.laptopL} {
    width: 25%;
    height 75%;
}


&:hover {
    cursor: pointer;
    background-color: aqua;
}
`

export const ConfirmText = styled.p`
color: green;
font-size: 1.05em;
width: 80%;
text-align: center;
font-style: italic;
display: none;
justify-content: center;
align-items: center;
`

export const FormTitle = styled.h1`
width: 100%;
text-align: center;
font-size: 1.7em;
font-weight: 700;
font-family: Rubik;
`

export const InputDiv = styled.div`
height: 15%;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column
`

export const InputTitle = styled.h1`
font-size: 1.1em;
font-weight: 600;
text-align: center;
width: 70%;
font-family: Rubik;
margin-bottom: 1.1em;
`

export const Input = styled.input`
width: 70%;
height: 2em;
background-color: #f6fbff;
border: none;
border-bottom: 1px solid black;
text-align: center;

&:focus {
    background-color: #86cfff2b;
    outline: none;
}
`

export const Select = styled.select`
background-color: white;
width: 70%;
border-radius: 2%;
`

export const Span = styled.span`
text-decoration: underline;
color: white;
font-family: Rubik
z-index: 1;

&:hover {
    color: aqua;
    cursor: pointer;
}
`

export const ThirdDiv = styled.div`
@media ${device.mobileS} {
display: flex;
width: 100%;
flex: 1.5;
flex-direction: column;
background-color: #00000082;
border-bottom: black;
}

@media ${device.tablet} {

flex-direction: row;
}

@media ${device.laptopL} {

flex-direction: row;
}
`

export const RadioDiv = styled.div`
@media ${device.mobileS} {
    display: flex;
    width: 80%;
    height: 3.5em;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #7c7c7c3d;
}

@media ${device.tablet} {
    flex-wrap: nowrap;
    height: 4em;
}

`

export const RadioButtonDiv = styled.div`
@media ${device.mobileS} {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
}

@media ${device.tablet} {
    flex-wrap: nowrap;
}

`

export const RadioLabel = styled.div`
font-family: Rubik
    font-size: 1.4em;
    margin-left: .4em;
    font-weight: 600;
`

export const RadioInput = styled.input`
    height: 1.3em;
    width: 3em;
`