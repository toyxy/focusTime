import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <Button title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <Button title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <Button title="20" onPress={() => onChangeTime(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  }
});
