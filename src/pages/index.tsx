import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import {useState} from "react";
import {Pokemon} from "../typings/pokemon-API";
import {colorSchemes, statNames} from "../constants";
import _ from "lodash";
import {PokemonData, PageStyle} from "../typings/custom";
import Portrait from '@/components/Portrait';
import StatsGraph from '@/components/StatsGraph';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    await axios.post("/api/pokeapi", {
      pokemon: searchText,
    })
    .then((response) => {
      setPokemon(response.data);
      setSearchText("");
    }, (error) => {
      console.log(error);
    });
  }

  let pokemonData = {} as PokemonData;
  let pageStyling = {} as PageStyle;
  
  if(pokemon){
    pokemonData = {
      name: _.capitalize(pokemon.name),
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

  let body = `${styles.container}`;
  //body = body + ` ${styles.fire}`;

  function getSearch(output: string){
    setSearchText(output);
  }

  return (
    <>
      <Head>
        <title>PokeAPI Viewer</title>
      </Head>
      <main className={body}>
        <SearchBar output={getSearch} feedback={searchText}/>
        {pokemon && 
          <div className={styles.pokemonData}>
            <div className={styles.graph}>
              <StatsGraph
                pokeData={pokemonData}
                pageStyle={pageStyling}
              />
            </div>
            <div className={styles.card}>
              <img src={pokemonData.image} alt={pokemon.name} className={styles.defaultImg}/>
            </div>
          </div>
        }
        <Portrait />
      </main>
    </>
  )
}
