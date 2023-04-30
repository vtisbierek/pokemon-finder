import styles from "../styles/Card.module.css";
import {PokemonData, PageStyle} from "../typings/custom";
import styled from "styled-components";

interface CardProps{
    pokeData: PokemonData;
    pageStyle: PageStyle;
}

const Div = styled("div")<{bgColor1: string, bgColor2: string}>`
&{
    position: relative;
    width: 400px;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px 30px;
    transition: 0.5s;
}

&::before{
    content: "";
    position: absolute;
    top: 0;
    left: 50px;
    width: 50%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
}

&::after{
    content: "";
    position: absolute;
    top: 0;
    left: 50px;
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    transform: skewX(15deg);
    transition: 0.5s;
    filter: blur(30px);
    transition: 0.5s;
}

&:hover::after,
&:hover:before{
    transform: skewX(0deg);
    left: 20px;
    width: calc(100% - 90px);
}

&::after,
&::before{
    background: linear-gradient(315deg, ${props => props.bgColor2}, ${props => props.bgColor1});
}
`;

export default function Card({pokeData, pageStyle}: CardProps){    
    return (
        <div className={styles.container}>
            <Div className={styles.box} bgColor1={pageStyle.background} bgColor2={pageStyle.border}>
                <span></span>
                <div className={styles.content}>
                    <img src={pokeData.image} alt={pokeData.name}/>
                    <h2>{pokeData.name}</h2>
                    <p>Pokemon facts</p>
                </div>
            </Div>
        </div>
    );
}