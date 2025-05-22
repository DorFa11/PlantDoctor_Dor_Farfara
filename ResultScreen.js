import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import GradientBackground from './GradientBackground';

export default function ResultScreen({ route, navigation }) {
  const { imageUri, diagnosis } = route.params;

  return (
    <GradientBackground>
      <Appbar.Header style={styles.appbar}>
        <Image source={require('./assets/plantdorctorlogo.jpg')} style={styles.icon} />
        <Appbar.Content title="PlantDoctor" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.animView}>
        <View style={styles.content}>
          <Text style={styles.title}>Diagnosis Result</Text>

          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}

          <Text style={styles.resultText}>{diagnosis || 'No diagnosis provided.'}</Text>
          
          <View style={styles.buttonContainer}>
            <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonLabel}
                onPress={() => navigation.navigate('Home')}
            >
                Scan Another Plant
            </Button>
          </View>
        </View>
      </Animatable.View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#000',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  appbarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00FFCC',
    textAlign: 'left',
  },
  icon: {
    width: 63,
    height: 63,
    resizeMode: 'cover',
  },
  animView: {
    flex: 1,
    justifyContent: 'flex-start',  // Align content to the top
    paddingTop: 120,               // Enough padding to clear the Appbar
    paddingHorizontal: 20,         // Optional: horizontal spacing
  },

  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  buttonContainer:{
    paddingTop: 30,
  },
  button: {
    backgroundColor: '#00FFCC',
    width: '75%',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#000',
  },
});
