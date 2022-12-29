import {useEffect, useState} from 'react';
import {pokemosApi} from '../api/pokemonApi';
import {
  IPokemonPaginatedResponse,
  IResult,
  ISimplePokemon,
} from '../types/IPokemon';

export const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<ISimplePokemon[]>(
    []
  );

  const loadPokemons = async () => {
    const resp = await pokemosApi.get<IPokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200'
    );

    mapPokemonList(resp.data.results);
  };

  const mapPokemonList = (pokemonList: IResult[]) => {
    const newPokemonList: ISimplePokemon[] = pokemonList.map(({name, url}) => {
      //https://pokeapi.co/api/v2/pokemon/1
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });

    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  useEffect(() => {
    loadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {simplePokemonList, isFetching};
};
