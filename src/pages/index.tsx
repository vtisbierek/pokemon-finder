import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import {useState, useEffect} from "react";
import {Pokemon} from "../typings/pokemon-API";
import {colorSchemes, defaultPoke, defaultStyle} from "../constants";
import _ from "lodash";
import {PokemonData, PageStyle} from "../typings/custom";
import Card from '@/components/Card';
import Graph from '@/components/Graph';
import SearchBar from '@/components/SearchBar';
import Headline from '@/components/Headline';
import Footer from '@/components/Footer';
import Modal, {RenderModalBackdropProps} from "react-overlays/Modal";
import {RiCloseFill} from "react-icons/ri";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [graphClasses, setGraphClasses] = useState(`${styles.graph}`);
  const [pokeData, setPokeData] = useState<PokemonData>(defaultPoke);
  const [pageStyle, setPageStyle] = useState<PageStyle>(defaultStyle);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [disableSearch, setDisableSearch] = useState(false);

  useEffect(() => {
    if(pokemon){
      setPokeData({
        name: _.upperCase(pokemon?.name),
        number: pokemon?.id as number,
        image: `/images/${pokemon?.id}.png`,
        shiny: `/images/shiny/${pokemon?.id}.png`,
        height: (pokemon?.height as number * 10) / 100 + "m",
        weight: pokemon?.weight as number / 10 + "kg", 
        types: pokemon?.types.map(type => type.type.name) as string[],
        stats: pokemon?.stats.map(stat => stat.base_stat) as number[],
      });      
    }
  }, [pokemon]);

  useEffect(() => {
    if(pokemon){
      setPageStyle({
        background: colorSchemes[pokeData?.types[0] as keyof typeof colorSchemes].background,
        border: colorSchemes[pokeData?.types[0] as keyof typeof colorSchemes].border,
      });
    }
  }, [pokeData]);

  async function handleSearch(){
    setDisableSearch(true);

    await axios.post("/api/pokeapi", {
      pokemon: searchText,
    })
    .then((response) => {
      setPokemon(response.data);
      setSearchText("");
      setGraphClasses(`${styles.graph} ${styles.active}`);   
      setDisableSearch(false);   
    }, (error) => {
      setErrorMessage(error.response.data);
      setShowModal(true);
      setDisableSearch(false);
    });
  }

  function getSearch(output: string){
    setSearchText(output);
  }

  //backdrop utilizado para o modal das mensagens de erro (https://www.npmjs.com/package/react-overlays)
  const renderBackdrop = (props: RenderModalBackdropProps) => <div className={styles.backdrop} {...props} />;

  return (
    <>
      <Head>
        <title>PokeAPI Viewer</title>
        <link rel="shortcut icon" href="/images/others/pokeball.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.container}>
        <Modal
          className={styles.modal}
          show={showModal}
          onHide={() => setShowModal(false)}
          renderBackdrop={renderBackdrop}
        >
          <div>
            <h1 className={styles.modalMessage}>{errorMessage}</h1>
            <button onClick={() => setShowModal(false)} className={styles.buttonClose}>
                <RiCloseFill />
            </button>
          </div>
        </Modal>
        <Headline />
        <SearchBar output={getSearch} feedback={searchText} trigger={handleSearch} disabled={disableSearch}/>
        <div className={styles.panel}>
          <div className={styles.card}>
            <Card
              pokeData={pokeData}
              pageStyle={pageStyle} 
            />
          </div>
          <div className={graphClasses}>
            <div>
              <Graph
                pokeData={pokeData}
                pageStyle={pageStyle}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
