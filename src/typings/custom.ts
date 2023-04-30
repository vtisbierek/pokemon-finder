export interface PokemonData{
    name: string;
    number: number;
    image: string;
    shiny: string;
    height: string;
    weigth: string;
    types: string[];
    stats: number[];
}

export interface PageStyle{
    background: string;
    border: string;
    statNames: string[]; 
}