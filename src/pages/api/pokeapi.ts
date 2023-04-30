import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PokemonClient } from 'pokenode-ts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const api = new PokemonClient();
  const pokemon = req.body.pokemon;

  await api
  .getPokemonByName(pokemon)
  .then((data) => res.status(200).json(data))
  .catch((error: AxiosError) => console.log(error));
}
