import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}> {item.subject} </Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={{ flex: 0.7, alignItems: 'center' }}>
        <Text style={styles.title}>Task History</Text>
        {!!focusHistory.length && (
          <>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <Button title="CLEAR HISTORY" onPress={() => onClear()} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status == 1 ? 'green' : 'red',
    fontSize: fontSizes.md,
  }),
  title: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
