/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles} from '../theme/appTheme';
import {ISimplePokemon} from '../types/IPokemon';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();

  const [pokemonFiltered, setPokemonFiltered] = useState<ISimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, marginHorizontal: 20}}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: top + 10,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 15,
              marginTop: top + 65,
            }}
          >
            {term}
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
