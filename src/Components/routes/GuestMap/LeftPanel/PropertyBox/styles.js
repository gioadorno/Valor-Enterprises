import styled from 'styled-components';
import RubikMedium from '../../Rubik/Rubik-VariableFont_wght.ttf'

export const PropertyDiv = styled.div`
width: 100%;
height: 40em;
border-bottom: 1px solid gray;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

`

export const ImageDiv = styled.div`
display: flex;
height: 65%;
width: 100%;
align-items: center;
flex-direction: column;
justify-content: center;
`

export const Image = styled.img`
border: 1px solid black;
width: 100%;
height: 100%;
`

export const LoadingDiv = styled.div`
display: flex;
margin-left: 35%;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const Loading = styled.p`
color: black;
font-size: 1.1em;
`

export const BoxDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: flex-start;
width: 100%;
height: 55%;
overflow-x: hidden;
overflow-y: hidden;
`

export const Address = styled.p`
font-size: 1.1em;
font-family: Rubik;
font-weight: 550;
text-align: center;
`

export const BottomDiv = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100%;
`

export const LeftDiv = styled.div`
display: flex;
flex-direction: column;
width: 45%;
height: 100%;
align-items: center;
justify-content: flex-start;
`

export const RightDiv = styled.div`
display: flex;
flex-direction: column;
width: 55%;
height: 100%;
align-items: center;
justify-content: flex-start
`

export const LabelDiv = styled.div`
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
margin-left: 1em;
height: 2em;
`

export const Labels = styled.label`
font-size: .9em;
font-family: Rubik;
font-weight: 550;
display: flex:
flex-direction: row;
`

export const Details = styled.p`
font-size: .9em;
font-family: Rubik;
margin-left: 1px;
`
export const Phone = styled.a`
font-size: .9em;
font-family: Rubik
`

export const Email = styled.a`
font-size: .9em;
font-family: Rubik
`

export const Photos = styled.a`
font-size: .9em;
font-family: Rubik
`