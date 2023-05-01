import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import {useState, useEffect} from "react";
import {Pokemon} from "../typings/pokemon-API";
import {colorSchemes, defaultPoke, defaultStyle} from "../constants";
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
  const [pokeData, setPokeData] = useState<PokemonData>(defaultPoke);
  const [pageStyle, setPageStyle] = useState<PageStyle>(defaultStyle);

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
      console.log("dentro do useeffect " + pokeData.types.length);
      
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
              pokeData={pokeData}
              pageStyle={pageStyle} 
            />
          </div>
          <div className={graphClasses}>
            <div>
              <StatsGraph
                pokeData={pokeData}
                pageStyle={pageStyle}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
