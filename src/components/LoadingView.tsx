import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

type LoadingViewProps = {
  text?: string;
};

const LoadingView = ({text}: LoadingViewProps) => (
  <View style={styles.activityIndicator}>
    <ActivityIndicator />
    <Text>{text}</Text>
  </View>
);

export default LoadingView;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
