import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 10,
  },
  likeCountText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  viewCountText: {
    color: COLORS.white,
  },
});
