import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const HomeSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.skeletonContainer}>
          <View style={styles.skeletonThumbnail} />
          <View style={styles.skeletonTextContainer}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  skeletonThumbnail: {
    width: 120,
    height: 90,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 16,
  },
  skeletonTextContainer: {
    flex: 1,
  },
  skeletonTitle: {
    width: '70%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSubtitle: {
    width: '50%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default HomeSkeleton;
