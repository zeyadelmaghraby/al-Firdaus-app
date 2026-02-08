import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme';

interface Props {
  onPress: () => void;
}

const ContinueFab: React.FC<Props> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <Pressable style={[styles.fab, { backgroundColor: colors.accent }]} onPress={onPress}>
      <Ionicons name="play" size={18} color="#fff" />
      <Text style={styles.text}>تابع القراءة</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default ContinueFab;
