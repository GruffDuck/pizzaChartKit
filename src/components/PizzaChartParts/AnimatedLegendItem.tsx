/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Animated, View, Text, Easing} from 'react-native';
import {AnimatedLegendItemProps} from '../types/StorageTypes';
import {styles} from '../styles/ChartStyles';

const AnimatedLegendItem = ({
  item,
  percentage,
  isDarkMode,
  animationDelay = 0,
}: AnimatedLegendItemProps) => {
  const [opacity] = useState(new Animated.Value(0));
  const [translateY] = useState(new Animated.Value(20));

  useEffect(() => {
    // Start animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: animationDelay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: animationDelay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [opacity, translateY, animationDelay]);

  return (
    <Animated.View
      style={[
        styles.legendItem,
        {
          backgroundColor: isDarkMode
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.03)',
          opacity,
          transform: [{translateY}],
        },
      ]}>
      <View style={styles.legendLeftSection}>
        <View
          style={[
            styles.legendColor,
            {
              backgroundColor: item.color,
              shadowColor: item.color,
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 3,
            },
          ]}
        />
        <Text
          style={[
            styles.legendText,
            {color: isDarkMode ? '#FFFFFF' : '#333333'},
          ]}>
          {item.name}
        </Text>
      </View>
      <View style={styles.legendRightSection}>
        <Text
          style={[
            styles.legendSize,
            {color: isDarkMode ? '#FFFFFF' : '#333333'},
          ]}>
          {`${item.size} GB`}
        </Text>
        <Text
          style={[
            styles.legendPercentage,
            {color: isDarkMode ? '#CCCCCC' : '#666666'},
          ]}>
          {`${percentage}%`}
        </Text>
      </View>
    </Animated.View>
  );
};

export default AnimatedLegendItem;
