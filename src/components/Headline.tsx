import styles from "../styles/Headline.module.css";
import { useRouter } from 'next/router';

export default function Headline(){
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.frame}>
                <div className={styles.content} onClick={() => router.reload()}>
                    <img src="/images/others/pokemon.png" alt="pokemon logo" />
                    <h1>FINDER</h1>
                </div>
            </div>
        </div>
    );
}