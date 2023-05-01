import styles from "../styles/Card.module.css";
import {PokemonData, PageStyle} from "../typings/custom";
import {useState, useEffect} from "react";
import {Div, Span, Types} from "../styles/Card";

interface CardProps{
    pokeData: PokemonData;
    pageStyle: PageStyle;
}

export default function Card({pokeData, pageStyle}: CardProps){    
    const [rotateClass, setRotateClass] = useState(false);
    const [appearance, setAppearance] = useState("'SWITCH SHINY'");

    useEffect(() => {
        if(rotateClass){
            setAppearance("'SWITCH NORMAL'");
        } else{
            setAppearance("'SWITCH SHINY'");
        }
    }, [rotateClass]);

    return (
        <div className={styles.container}>
            <Div className={styles.box} bgColor1={pageStyle.background} bgColor2={pageStyle.border}>
                {pokeData.name && (
                    <>
                        <Span appearance={appearance} onClick={() => setRotateClass(!rotateClass)}></Span>
                        <Types 
                            imageUrl1={`/images/types/${pokeData.types[0]}.png`} 
                            imageUrl2={`/images/types/${pokeData.types[1]}.png`} 
                            types={pokeData.types.length}
                        ></Types>
                    </>
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