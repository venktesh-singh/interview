import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const LoadingOverlay = props => {
  return (
    <View style={styles.parentContainer}>
      <ActivityIndicator size="large" color={'grey'} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    height: '100%',
    width: '100%',
  },
  loadingText: {textAlign: 'center', color: 'blue', zIndex: 99999},
});
