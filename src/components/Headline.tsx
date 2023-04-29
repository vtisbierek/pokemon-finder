import styles from "../styles/Headline.module.css";

export default function Headline(){
    return (
        <div className={styles.container}>
            <div className={styles.frame}>
                <div className={styles.content}>
                    <img src="/images/others/pokemon.png" alt="pokemon logo" />
                    <h1>FINDER</h1>
                </div>
            </div>
        </div>
    );
}