import { Config } from '@/config/env';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen {JSON.stringify(Config)}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
