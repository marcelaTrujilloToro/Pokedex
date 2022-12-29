/* eslint-disable react-native/no-inline-styles */
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigator/Tab1';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import {PokemonDetails} from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;

  const {top} = useSafeAreaInsets();

  const {pokemon, isLoading} = usePokemon(simplePokemon.id);

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{...styles.backButton, top: top + 5}}
        >
          <Icon name="arrow-back-outline" color="white" size={40} />
        </TouchableOpacity>

        {/* Nombre del pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 45,
            textTransform: 'capitalize',
          }}
        >
          {simplePokemon.name + '\n'} #{simplePokemon.id}
        </Text>

        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokeball}
        />

        {/* Pokemon */}
        <FadeInImage
          uri={simplePokemon.picture}
          style={{...styles.pokemonImage}}
        />
      </View>

      {/* Detalles y loading */}

      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={25} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.6,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
