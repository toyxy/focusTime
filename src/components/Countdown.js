import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({
  minutes,
  isPaused,
  onProgress,
  onCountdownEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((millis) => {
      if (millis === 0) {
        clearInterval(interval.current);

        return millis;
      }
      const timeleft = millis - 1000;

      return timeleft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onCountdownEnd();
    }
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minuteLeft = Math.floor(millis / 1000 / 60) % 60;
  const secondLeft = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minuteLeft)}:{formatTime(secondLeft)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
