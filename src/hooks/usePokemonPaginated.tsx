import {useEffect, useRef, useState} from 'react';
import {pokemosApi} from '../api/pokemonApi';
import {
  IPokemonPaginatedResponse,
  IResult,
  ISimplePokemon,
} from '../types/IPokemon';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<ISimplePokemon[]>(
    [],
  );

  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemosApi.get<IPokemonPaginatedResponse>(
      nextPageUrl.current,
    );
    nextPageUrl.current = resp.data.next;

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

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {simplePokemonList, isLoading, loadPokemons};
};
