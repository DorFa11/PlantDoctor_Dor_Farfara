import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import GradientBackground from './GradientBackground';
import { useNavigation } from '@react-navigation/native'; 
import { ServerUrlContext } from './ServerUrlContext';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';


const HomeScreen = () => {
  const navigation = useNavigation(); 
  const { serverUrl } = useContext(ServerUrlContext);

  return (
    <GradientBackground>
      <Appbar.Header style={styles.appbar}>
        <Image source={require('./assets/plantdorctorlogo.jpg')} style={styles.icon} />
        <Appbar.Content title="PlantDoctor" titleStyle={styles.appbarTitle} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.hiddenButton}
          accessible={true}
          accessibilityLabel="Open Settings"
        />
      </Appbar.Header>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.animView}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            You think your plant is sick and not sure how to help it? Let our model take a look!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              if (serverUrl) {
                navigation.navigate('Scan');
              } else {
                alert('Please set the server URL first in Settings');
              }
            }}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Scan Now
          </Button>
        </View>
      </Animatable.View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  hiddenButton: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
    opacity: 0.01,  
    marginRight: 10,
    borderRadius: 4,
  },
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
    justifyContent: 'center',
    paddingTop: 100, // Space below Appbar
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 30, // give left/right padding
    alignItems: 'center',
  },

  subtitle: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingBottom: 125,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00FFCC',
    width: '75%',
  },
  buttonLabel: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
