/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Svg, {Defs, G, LinearGradient, Stop} from 'react-native-svg';
import {StorageChartProps} from '../types/StorageTypes';
import {styles} from '../styles/ChartStyles';
import {getChartDimensions, gapAngle} from '../utils/ChartUtils';
import AnimatedArcPath from './AnimatedArcPath';
import AnimatedInnerPath from './AnimatedInnerPath';
import Legend from './Legend';

const PizzaChart = ({
  data,
  totalStorage = 128,
  animationDuration = 1000,
  animationSpeed = 1, // Default speed 1 (normal speed)
  showLegend = true, // Legend is shown by default
  showEmptySpace = false, // Empty space is not shown by default
  showPizza = true, // Pizza slices are shown by default
  title = 'Storage Chart', // Default title
  emptySpaceTitle = 'Empty Space', // Default empty space title
}: StorageChartProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [animationProgress] = useState(new Animated.Value(0));
  const [dimensions, setDimensions] = useState(getChartDimensions());
  const [displayValue, setDisplayValue] = useState('0.0');

  // Calculate total used space
  const usedStorage = data.reduce((total, item) => total + item.size, 0);

  // Empty space amount
  const emptyStorage = totalStorage - usedStorage;

  // Recalculate when screen size changes
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions(getChartDimensions());
    };

    // Listen for initial render and screen rotation events
    // Dimensions API has changed in newer versions of React Native
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions,
    );

    return () => {
      // Cleanup
      subscription.remove();
    };
  }, []);

  // Watch animation value
  useEffect(() => {
    const listener = animationProgress.addListener(({value}) => {
      // Animated value
      const currentValue = (usedStorage * value).toFixed(1);
      setDisplayValue(currentValue);
    });

    return () => {
      animationProgress.removeListener(listener);
    };
  }, [animationProgress, usedStorage]);

  useEffect(() => {
    // Start animation
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: animationDuration / animationSpeed, // Adjust duration based on speed
      useNativeDriver: false, // Native driver can't be used for SVG animations
      easing: Easing.out(Easing.cubic), // Added easing for smoother animation
    }).start();

    return () => {
      // Cleanup
      animationProgress.stopAnimation();
    };
  }, [animationProgress, animationDuration, animationSpeed]);

  // Create slices
  const slices: React.ReactElement[] = [];
  const defs: React.ReactElement[] = [];

  // Prepare data for empty space
  const allData = [...data];
  if (showEmptySpace && emptyStorage > 0) {
    // Add data for empty space - normal color
    allData.push({
      name: emptySpaceTitle,
      size: emptyStorage,
      color: isDarkMode ? '#444444' : '#e0e0e0',
      gradientStart: isDarkMode ? '#444444' : '#e0e0e0', // Use same color to remove gradient effect
      gradientEnd: isDarkMode ? '#444444' : '#e0e0e0', // Use same color to remove gradient effect
      innerColor: isDarkMode
        ? 'rgba(68, 68, 68, 0.2)'
        : 'rgba(224, 224, 224, 0.2)',
    });
  }

  let currentAngle = 0;

  // Total area (including or excluding empty space)
  const totalSize = showEmptySpace ? totalStorage : usedStorage;

  // Create slice for each storage item
  allData.forEach((item, index) => {
    // Gradient definition
    const gradientId = `gradient-${index}`;
    defs.push(
      <LinearGradient
        key={gradientId}
        id={gradientId}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%">
        <Stop offset="0%" stopColor={item.gradientStart || item.color} />
        <Stop offset="100%" stopColor={item.gradientEnd || item.color} />
      </LinearGradient>,
    );

    // Calculate angle range for this slice
    const sweepAngle =
      (item.size / totalSize) * (360 - allData.length * gapAngle);

    // Start and end angles for the slice
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweepAngle;

    // Large arc flag
    const largeArcFlag = sweepAngle <= 180 ? 0 : 1;

    // Outer arc
    slices.push(
      <G key={`slice-${index}`}>
        <AnimatedArcPath
          startAngle={startAngle}
          endAngle={endAngle}
          radius={dimensions.radius}
          center={dimensions.center}
          strokeWidth={dimensions.strokeWidth}
          stroke={`url(#${gradientId})`}
          animationProgress={animationProgress}
          delay={index * (100 / animationSpeed)} // Adjust delay based on speed
        />
        {showPizza && (
          <AnimatedInnerPath
            startAngle={startAngle}
            endAngle={endAngle}
            outerRadius={dimensions.radius - dimensions.strokeWidth / 2}
            innerRadius={dimensions.innerRadius}
            center={dimensions.center}
            fill={item.innerColor || `${item.color}20`} // Inner color or default transparent color
            animationProgress={animationProgress}
            largeArcFlag={largeArcFlag}
            delay={(index * 100 + 50) / animationSpeed} // Slightly after outer arc
          />
        )}
      </G>,
    );

    // Update angle for next slice
    currentAngle = endAngle + gapAngle;
  });

  // Adjust title and text sizes based on screen size
  const titleFontSize = Math.max(dimensions.size * 0.09, 20); // Minimum 20
  const centerTextFontSize = Math.max(dimensions.size * 0.08, 18); // Minimum 18
  const totalTextFontSize = Math.max(dimensions.size * 0.06, 14); // Minimum 14

  return (
    <View style={styles.chartContainerWithLegend}>
      {/* Title - now inside the component */}
      <Text
        style={[
          styles.title,
          {
            color: isDarkMode ? '#FFFFFF' : '#333333',
            fontSize: titleFontSize,
          },
        ]}>
        {title}
      </Text>

      <View
        style={[
          styles.chartContainer,
          {width: dimensions.size, height: dimensions.size},
        ]}>
        <Svg width={dimensions.size} height={dimensions.size}>
          <Defs>{defs}</Defs>
          {slices}
        </Svg>
        {/* Center text */}
        <View style={styles.centerTextContainer}>
          <Text
            style={[
              styles.centerText,
              {
                color: isDarkMode ? '#FFFFFF' : '#333333',
                fontSize: centerTextFontSize,
              },
            ]}>
            {`${displayValue} GB`}
          </Text>
          {showEmptySpace && (
            <Text
              style={[
                styles.totalStorageText,
                {
                  color: isDarkMode ? '#AAAAAA' : '#666666',
                  fontSize: totalTextFontSize,
                },
              ]}>
              {`/ ${totalStorage} GB`}
            </Text>
          )}
        </View>
      </View>

      {/* Legend component - controlled by showLegend prop */}
      {showLegend && (
        <Legend
          data={data}
          isDarkMode={isDarkMode}
          showEmptySpace={showEmptySpace}
          totalStorage={totalStorage}
          emptySpaceTitle={emptySpaceTitle}
        />
      )}
    </View>
  );
};

export default PizzaChart;
