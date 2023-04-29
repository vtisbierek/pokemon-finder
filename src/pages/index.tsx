import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import {useState} from "react";
import {Pokemon} from "../typings/pokemon-API";
import {colorSchemes, statNames, defaultPoke, defaultStyle} from "../constants";
import _ from "lodash";
import {PokemonData, PageStyle} from "../typings/custom";
import Card from '@/components/Card';
import StatsGraph from '@/components/StatsGraph';
import SearchBar from '@/components/SearchBar';
import Headline from '@/components/Headline';

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [graphClasses, setGraphClasses] = useState(`${styles.graph}`);

  async function handleSearch(){
    await axios.post("/api/pokeapi", {
      pokemon: searchText,
    })
    .then((response) => {
      setPokemon(response.data);
      setSearchText("");
      setGraphClasses(`${styles.graph} ${styles.active}`);
    }, (error) => {
      console.log(error);
    });
  }

  let pokemonData = defaultPoke as PokemonData;
  let pageStyling = defaultStyle as PageStyle;
  
  if(pokemon){
    pokemonData = {
      name: _.upperCase(pokemon.name),
      image: `/images/${pokemon?.id}.png`,
      types: pokemon?.types.map(type => type.type.name),
      stats: pokemon?.stats.map(stat => stat.base_stat),
    };

    pageStyling = {
      background: colorSchemes[pokemonData.types[0] as keyof typeof colorSchemes].background,
      border: colorSchemes[pokemonData.types[0] as keyof typeof colorSchemes].border,
      statNames: statNames,
    };
  }

  function getSearch(output: string){
    setSearchText(output);
  }

  return (
    <>
      <Head>
        <title>PokeAPI Viewer</title>
      </Head>
      <main className={styles.container}>
        <Headline />
        <SearchBar output={getSearch} feedback={searchText} trigger={handleSearch}/>
        <div className={styles.panel}>
          <div className={styles.card}>
            <Card
              pokeData={pokemonData}
              pageStyle={pageStyling}
            />
          </div>
          <div className={graphClasses}>
            <div>
              <StatsGraph
                pokeData={pokemonData}
                pageStyle={pageStyling}
              />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
