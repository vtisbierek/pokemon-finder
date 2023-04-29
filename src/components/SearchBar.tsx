import styles from "../styles/SearchBar.module.css";
import {GoSearch} from "react-icons/go";
import {IoCloseOutline} from "react-icons/io5";
import {useState, useEffect} from "react";

interface BarProps{
    output: (category: string) => void;
    feedback: string;
}

export default function SearchBar({output, feedback}: BarProps){
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

    return (
        <div className={styles.container}>
            <div className={barClasses}>
                <div className={styles.icon} onClick={() => setExpandedBar(!expandedBar)}>
                    <GoSearch />
                </div>
                <div className={styles.input}>
                    <input type="text" placeholder="Digite o Pokémon" value={feedback} onChange={(e) => setInputText(e.currentTarget.value)}/>
                </div>
                <span className={styles.clear} onClick={() => setInputText("")}>
                    <IoCloseOutline />
                </span>
            </div>
            <div className={outlineClasses}></div>
        </div>
    );
}