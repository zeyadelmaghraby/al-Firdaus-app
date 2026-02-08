import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface Props {
  message: string;
}

const EmptyState: React.FC<Props> = ({ message }) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.muted, fontFamily: fonts.primary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmptyState;
