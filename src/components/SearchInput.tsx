/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDebouncedSetValue} from '../hooks/useDebouncedSetValue';

interface Props {
  onDebounce: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');

  const {debouncedValue} = useDebouncedSetValue(textValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search Pokemon"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={25} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    // backgroundColor: 'red',
  },
  textBackground: {
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
});
