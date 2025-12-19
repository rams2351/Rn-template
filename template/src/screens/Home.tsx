import { Text } from '@/components/Text';
import { StandardFonts } from '@/theme/Fonts';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler } from '@/utils/helpers';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = () => {
  const navigation = useNavigation();
  const { toggleTheme } = useTheme();

  return (
    <ScrollView>
      <Text>{/* {_.capitalize('hello')} {JSON.stringify(Config)} */}</Text>

      <MyComponent />
      {Object.keys(StandardFonts)?.map((key, i) => (
        <Text
          key={i}
          style={{
            fontSize: scaler(25),
            fontWeight: key,
            // color: 'yellow',
          }}
        >
          This is Open Sans-- -{key}
        </Text>
      ))}

      <Text style={{ fontSize: scaler(15), fontWeight: 800 }}>
        This is Open Sans-- - 800
      </Text>

      <Icon
        name="home"
        size={52}
        color={'green'}
        onPress={() => navigation.navigate('KeyboardAnimation' as never)}
      />

      <TouchableOpacity onPress={() => toggleTheme()}>
        <Text>setTheme</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;

const MyComponent = () => (
  <Text style={styles.customFont}>This is Open Sans Condensed Bold</Text>
);

const styles = StyleSheet.create({
  customFont: {
    // Note: Use the exact filename from your screenshot
    // fontFamily: 'OpenSans-ExtraBoldItalic',
    fontSize: 20,
  },
});
