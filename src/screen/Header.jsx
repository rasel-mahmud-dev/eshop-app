import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image source={{uri: 'https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid'}} style={styles.logo} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search on Daraz"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },

  logo: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 40,
  },
});

export default Header;
