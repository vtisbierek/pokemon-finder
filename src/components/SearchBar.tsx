import styles from "../styles/SearchBar.module.css";
import {GoSearch} from "react-icons/go";
import {useState, useEffect} from "react";

interface BarProps{
    output: (category: string) => void;
    feedback: string;
    trigger: () => void;
    disabled: boolean;
}

export default function SearchBar({output, feedback, trigger, disabled}: BarProps){
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

    useEffect(() => {
        if(!feedback){
            setInputText("");
        }
    }, [feedback]);

    function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key === "Enter"){
            trigger();
        }
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>){
        if (!disabled){
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
                        value={inputText}
                        onChange={(e) => setInputText(e.currentTarget.value)} 
                        onKeyDown={handleKeydown}
                    />
                </div>
                <span className={styles.send} onClick={handleClick}>
                    {
                        disabled ? (
                            <img src="/images/others/pokeball_disabled.png" alt="pokeball icon"/>
                        ) : (
                            <img src="/images/others/pokeball.png" alt="pokeball icon"/>
                        )
                    }
                </span>
            </div>
            <div className={outlineClasses}></div>
        </div>
    );
}