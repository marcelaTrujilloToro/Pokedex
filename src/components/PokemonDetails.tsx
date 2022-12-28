/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {PokemonFull} from '../types/IPokemon';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}
export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types */}
      <View style={{...styles.container, marginTop: 380}}>
        <Text style={styles.tittle}>Types</Text>

        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text
              style={{...styles.regularText, marginRight: 10}}
              key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>

        <Text style={styles.tittle}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}</Text>
      </View>

      {/* Sprites */}
      <View style={styles.container}>
        <Text style={styles.tittle}>Sprites</Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Skills */}
      <View style={{...styles.container}}>
        <Text style={styles.tittle}>Base Skills</Text>

        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              style={{...styles.regularText, marginRight: 10}}
              key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Skills */}
      <View style={{...styles.container}}>
        <Text style={styles.tittle}>Moves</Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              style={{...styles.regularText, marginRight: 10}}
              key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={{...styles.container}}>
        <Text style={styles.tittle}>Stats</Text>

        <View>
          {pokemon.stats.map((stat, index) => (
            <View style={{flexDirection: 'row'}} key={stat.stat.name + index}>
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  width: 200,
                  textTransform: 'capitalize',
                }}>
                {stat.stat.name}
              </Text>

              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  fontWeight: 'bold',
                }}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        <View style={{marginBottom: 50, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  tittle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 20,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
