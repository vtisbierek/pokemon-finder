import styles from "../styles/Footer.module.css";

export default function Footer(){
    const year = new Date().getFullYear();

    return (
        <div className={styles.container}>
            <p>VTisbierek {year}</p>
        </div>
    );
}