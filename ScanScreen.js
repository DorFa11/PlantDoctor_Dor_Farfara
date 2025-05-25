import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Appbar, Text } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import GradientBackground from './GradientBackground';
import { useNavigation } from '@react-navigation/native'; 
import ImageResizer from 'react-native-image-resizer';
import { useEffect } from 'react';
import { ServerUrlContext } from './ServerUrlContext';
import { useContext } from 'react';


const ScanScreen = () => {
  const navigation = useNavigation(); 
  
  const [imageUri, setImageUri] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dotCount, setDotCount] = useState(0);
  const { serverUrl } = useContext(ServerUrlContext);


  useEffect(() => {
    let interval = null;

    if (isAnalyzing) {
      interval = setInterval(() => {
        setDotCount((prev) => (prev + 1) % 4); // loops between 0, 1, 2, 3
      }, 300);
    } else {
      setDotCount(0);
    }

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const takePhoto = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Camera permission denied');
        return;
      }
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets[0].uri);
        } else if (response.errorMessage) {
          console.warn('Camera error: ', response.errorMessage);
        }
      }
    );
  };

  const pickFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response) => {
        if (!response.didCancel && !response.errorCode) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };


  const analyzeImage = async () => {
  if (isAnalyzing) return; // Prevent double submission

  setIsAnalyzing(true);
  try {
    const resized = await ImageResizer.createResizedImage(
      imageUri,
      224,
      224,
      'JPEG',
      100,
      0,
      undefined,
      false,
      { mode: 'cover' }  // Ensures it fills the size and crops overflow
    )


    const formData = new FormData();
    formData.append('file', {
      uri: Platform.OS === 'android' ? resized.uri : resized.uri.replace('file://', ''),
      name: 'plant.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch(`${serverUrl}/predict`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('❌ Error response:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ Server response:', result);

    navigation.navigate('Result', {
      imageUri: imageUri,
      diagnosis: `${result.class} \n (Confidence: ${(result.confidence * 100).toFixed(2)}%)`,
    });

  } catch (error) {
    console.error('❌ Failed to analyze image:', error);
  } finally {
    setIsAnalyzing(false);
  }
};

  return (
    <GradientBackground>
      <Appbar.Header style={styles.appbar}>
        <Image source={require('./assets/plantdorctorlogo.jpg')} style={styles.icon} />
        <Appbar.Content title="PlantDoctor" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <Animatable.View animation="fadeInUp" duration={1500} style={styles.animView}>
        <View style={styles.content}>

          {/* Conditional rendering */}
          {!imageUri ? (
            <>
            <Text style={styles.subtitle}>Choose a method to scan your plant</Text>
            <View style={styles.buttonContainerBeforeImg}>
              <Button
                mode="contained"
                onPress={takePhoto}
                style={styles.buttonBeforeImg}
                labelStyle={styles.buttonLabel}
              >
                Take Photo
              </Button>
              <View style={{ height: 16 }} />
              <Button
                mode="contained"
                onPress={pickFromGallery}
                style={styles.buttonBeforeImg}
                labelStyle={styles.buttonLabel}
              >
                Pick from Gallery
              </Button>
            </View>
            </>
          ) : (
            <>
              <Text style={styles.subtitle}>Satisfied with the image?</Text>
              <Image source={{ uri: imageUri }} style={styles.image} />
              
              {isAnalyzing ? (
                <Text style={{ color: '#00FFCC', fontSize: 60, marginTop: 40 }}>
                  {'.'.repeat(dotCount)}
                </Text>
            ) : (
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={analyzeImage}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  disabled={isAnalyzing}
                >
                  Analyze Image
                </Button>

                <View style={{ height: 16 }} />
                <Button
                  mode="outlined"
                  onPress={() => setImageUri(null)}
                  style={[styles.button, { backgroundColor: 'transparent', borderColor: '#00FFCC' }]}
                  labelStyle={[styles.buttonLabel, { color: '#00FFCC' }]}
                  disabled={isAnalyzing}
                >
                  Back
                </Button>
              </View>
            )}

            </>
          )}
        </View>
      </Animatable.View>
    </GradientBackground>
  );
};

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
    justifyContent: 'center',
    paddingTop: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    paddingTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  buttonContainerBeforeImg: {
    paddingTop: 175,
    width: '100%',
    alignItems: 'center',
  },
  buttonBeforeImg: {
    backgroundColor: '#00FFCC',
    width: '90%',
  },
  button: {
    backgroundColor: '#00FFCC',
    width: '75%',
  },
  buttonLabel: {
    fontSize: 18,
    color: '#000',
  },
  image: {
    width: 224,
    height: 224,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#00FFCC',
  },
});

export default ScanScreen;
