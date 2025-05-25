import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, Appbar } from 'react-native-paper';
import GradientBackground from './GradientBackground';
import { ServerUrlContext } from './ServerUrlContext';

const SettingsScreen = ({ navigation }) => {
  const { serverUrl, setServerUrl } = useContext(ServerUrlContext);
  const [input, setInput] = useState(serverUrl);

  const saveUrl = () => {
    if (input.trim()) {
      setServerUrl(input.trim());
      navigation.goBack();
    } else {
      alert('Please enter a valid URL');
    }
  };

  return (
    <GradientBackground>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.label}>Server URL:</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            returnKeyType="done"
          />
        </View>
        <Button
        mode="contained"
        onPress={saveUrl}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        >
        Save & Go Back
        </Button>
        
      </KeyboardAvoidingView>
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
  container: {
    flex: 1,
    paddingTop: 100, // space below appbar
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingBottom: 250,
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: '#00FFCC',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00FFCC',
    alignSelf: 'center',
    width: '75%',
  },
  buttonLabel: {
    fontSize: 18,
    color: 'black',
  },
});

export default SettingsScreen;
