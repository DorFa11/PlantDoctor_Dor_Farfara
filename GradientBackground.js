import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('./assets/balckwhitebackground.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default GradientBackground;
