import styles from "../styles/Portrait.module.css";

export default function Portrait(){
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <span></span>
                <div className={styles.content}>
                    <img src="/images/6.png" alt="pokemon"/>
                    <h2>Pokemon name</h2>
                    <p>Pokemon facts</p>
                </div>
            </div>
        </div>
    );
}