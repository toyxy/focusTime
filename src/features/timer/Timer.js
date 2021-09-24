import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

export const Timer = ({ focusSubject, onTimerEnd, onCancel }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(), 1000)
      setTimeout(() => clearInterval(interval), 10000) 
    }
    else {
      Vibration.vibrate(10000);
    }
  }
  const onCountdownEnd = () => {
    vibrate();
    setMinutes(1);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes={minutes} 
          isPaused = {!isStarted} 
          onProgress = {onProgress}
          onCountdownEnd = {onCountdownEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{padding: spacing.sm}}>
        <ProgressBar progress={progress} color='#5E84E2' style={{height: 10}} />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? 
        <Button title='PAUSE' onPress = {() => setIsStarted(false)} /> :
        <Button title='START' onPress = {() => setIsStarted(true)} /> }
      </View>
      <View style={styles.onCancel}>
        <Button title='GO BACK?' onPress = {() => onCancel()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    textAlign: 'center'
  },
  task: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center'
  },
  onCancel: {
    paddingBottom: 15,
    padding: 5
  }
})
