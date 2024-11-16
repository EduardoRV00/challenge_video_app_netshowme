import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const DetailSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.videoSkeleton} />
    <View style={styles.textSkeleton} />
    <View style={styles.textSkeleton} />
    <View style={styles.descriptionSkeleton} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  videoSkeleton: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 16,
  },
  textSkeleton: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  descriptionSkeleton: {
    width: '90%',
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default DetailSkeleton;
