import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import axios from 'axios';
import {useState} from "react";
import {Pokemon} from "../typings/pokemon";
import {Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, RadialLinearScale, Filler} from "chart.js";
import {Radar} from "react-chartjs-2";
import {colorScheme} from "../color-scheme";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    await axios.post("/api/pokeapi", {
      pokemon: inputText,
    })
    .then((response) => {
      setPokemon(response.data);
      setInputText("");
    }, (error) => {
      console.log(error);
    });
  }

  ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
  );

  const pokemonTypes = pokemon?.types.map(type => type.type.name) || "normal";

  const data = {
    labels: pokemon?.stats.map(stat => stat.stat.name),
    datasets: [{
      label: "Base Stats",
      data: pokemon?.stats.map(stat => stat.base_stat),
      backgroundColor: colorScheme[pokemonTypes[0] as keyof typeof colorScheme].background,
      borderColor: colorScheme[pokemonTypes[0] as keyof typeof colorScheme].border,
    }]
  }

  const options = {}
  const imageSrc = `/images/${pokemon?.id}.png`;

  return (
    <>
      <Head>
        <title>PokeAPI Viewer</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='What pokémon are you looking for?' value={inputText} onChange={(e) => setInputText(e.currentTarget.value)}/>
          <button type="submit">FIND POKÉMON</button>
        </form>
        {pokemon && 
          <div className={styles.pokemonData}>
            <h1>{pokemon?.name}</h1>
            <div className={styles.stats}>
              <ul>
                {pokemon?.stats.map(stat => (
                  <li>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </div>
            <div className={styles.graph}>
              <Radar
                data={data}
                options={options}
              />
            </div>
            <div className={styles.card}>
              <img src={imageSrc} alt={pokemon.name} className={styles.defaultImg}/>
            </div>
          </div>
        }
      </main>
    </>
  )
}
