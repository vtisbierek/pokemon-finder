import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient } from 'pokenode-ts';
import _ from "lodash";

function dataValidation(data: string){
  //se o usuário passou um valor vazio, retorna falso na validação
  if(!data){
    return false;
  }
  return true;
}

function dataTransformation(data: string){
  let transform = data;

  //por segurança, verifica se o valor é mesmo uma string e, se não for, converte
  if(!_.isString(transform)){
    transform = String(transform);
  }
  //passa para lowercase, remove os pontos e substitui espaços por hífen, conforme padrão da PokeAPI
  transform = _.trim(_.lowerCase(transform)).replace(/\s+/g, "-");

  return transform;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = new PokemonClient();
  let pokemon = req.body.pokemon;

  //se o dado passado pelo usuário não for vazio, transforma para o padrão da PokeAPI e faz um GET request usando o método getPokemonByName do PokeClient
  if(dataValidation(pokemon)){
    pokemon = dataTransformation(pokemon);
    
    await api
    .getPokemonByName(pokemon)
    .then((data) => res.status(200).json(data))
    .catch((error: AxiosError) => console.log("xis"));
  } else {
    console.log("data validation fail");
  }


}
