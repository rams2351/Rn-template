import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function SmoothDismissScreen() {
  return (
    <KeyboardAwareScrollView
      // This enables the "drag to close" gesture
      keyboardDismissMode="interactive"
      // Ensures the input stays visible
      bottomOffset={62}
      contentContainerStyle={styles.container}
    >
      <View style={{}}>
        {/* Your UI Elements */}
        <View style={styles.placeholderBox} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Drag the view down to close me..."
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  placeholderBox: {
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
});
