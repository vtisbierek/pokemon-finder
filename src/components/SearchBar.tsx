import styles from "../styles/SearchBar.module.css";
import {GoSearch} from "react-icons/go";
import {useState, useEffect} from "react";

interface BarProps{
    output: (category: string) => void;
    feedback: string;
    trigger: () => void;
}

export default function SearchBar({output, feedback, trigger}: BarProps){
    const [expandedBar, setExpandedBar] = useState(false);
    const [barClasses, setBarClasses] = useState(`${styles.search}`);
    const [outlineClasses, setOutlineClasses] = useState(`${styles.outline}`);
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        if(expandedBar){
            setBarClasses(`${styles.search} ${styles.active}`);
            setOutlineClasses(`${styles.outline} ${styles.active}`);
        } else{
            setBarClasses(`${styles.search}`);
            setOutlineClasses(`${styles.outline}`);
        }
    }, [expandedBar]);

    useEffect(() => {
        output(inputText);
    }, [inputText]);

    function handleTrigger(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key === "Enter"){
            trigger();
        }
    }

    return (
        <div className={styles.container}>
            <div className={barClasses}>
                <div className={styles.icon} onClick={() => setExpandedBar(!expandedBar)}>
                    <GoSearch />
                </div>
                <div className={styles.input}>
                    <input
                        type="text"
                        placeholder="Digite o Pokémon"
                        value={feedback}
                        onChange={(e) => setInputText(e.currentTarget.value)} 
                        onKeyDown={handleTrigger}
                    />
                </div>
                <span className={styles.send} onClick={() => trigger()}>
                    <img src="/images/others/pokeball.png" alt="pokeball icon"/>
                </span>
            </div>
            <div className={outlineClasses}></div>
        </div>
    );
}