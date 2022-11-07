import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import Button from '../../components/Button';
import Colors from '../../theme/Colors';
import AddPicture from '../AddPicture';

const ctaAddPicture = 'New picture';

const PlantView = ({navigation}: any) => {
  const onAddPicture = () => {
    navigation.navigate(AddPicture);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>View that shows updates and information about plant</Text>
      </View>
      <Button disabled={false} onPress={onAddPicture} title={ctaAddPicture} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topContainer: {
    flex: 1,
  },
});

export default PlantView;
