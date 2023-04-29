import styles from "../styles/Card.module.css";
import {PokemonData, PageStyle} from "../typings/custom";

interface CardProps{
    pokeData: PokemonData;
    pageStyle: PageStyle;
}

export default function Card({pokeData, pageStyle}: CardProps){
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span></span>
                <div className={styles.content}>
                    <img src={pokeData.image} alt={pokeData.name}/>
                    <h2>{pokeData.name}</h2>
                    <p>Pokemon facts</p>
                </div>
            </div>
        </div>
    );
}