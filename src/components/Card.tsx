import styles from "../styles/Card.module.css";
import {PokemonData, PageStyle} from "../typings/custom";
import {useState} from "react";
import {Div} from "../styles/Card";

interface CardProps{
    pokeData: PokemonData;
    pageStyle: PageStyle;
}

export default function Card({pokeData, pageStyle}: CardProps){    
    const [rotateClass, setRotateClass] = useState(false);

    return (
        <div className={styles.container}>
            <Div className={styles.box} bgColor1={pageStyle.background} bgColor2={pageStyle.border}>
                {pokeData.name && (
                    <span className={styles.floatTop} onClick={() => setRotateClass(!rotateClass)}></span>
                )}
                <div className={styles.content}>
                    <div className={styles.flipBox}>
                        <div className={rotateClass ? styles.rotate : ""}>
                            <img src={pokeData.image} alt={pokeData.name}/>
                        </div>
                        <div className={!rotateClass ? styles.rotate : ""}>
                            <img src={pokeData.shiny} alt={pokeData.name}/>
                        </div>
                    </div>
                    {pokeData.name && (
                        <div className={styles.text}>
                            <h2>{pokeData.name} <span>#{pokeData.number}</span></h2>
                            <p>Altura: {pokeData.height} | Peso: {pokeData.weigth}</p>
                        </div>
                    )}
                </div>
            </Div>
        </div>
    );
}