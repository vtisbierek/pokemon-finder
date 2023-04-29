import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient } from 'pokenode-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = new PokemonClient();
  const pokemon = req.body.pokemon;

  await api
  .getPokemonByName(pokemon)
  .then((data) => res.status(200).json(data))
  //.then((data) => console.log(data))
  .catch((error: AxiosError) => res.status(error.response?.status!).json(error.response?.statusText));
}
