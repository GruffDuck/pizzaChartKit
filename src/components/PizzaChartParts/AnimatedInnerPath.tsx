import React, {useState, useEffect} from 'react';
// import { Animated } from 'react-native';
import {Path} from 'react-native-svg';
import {AnimatedInnerPathProps} from '../types/StorageTypes';
import {polarToCartesian} from '../utils/ChartUtils';

const AnimatedInnerPath = ({
  startAngle,
  endAngle,
  outerRadius,
  innerRadius,
  center,
  fill,
  animationProgress,
  largeArcFlag,
  delay = 0,
}: AnimatedInnerPathProps) => {
  const [pathD, setPathD] = useState('');

  useEffect(() => {
    // Watch animation value
    const listener = animationProgress.addListener(({value}) => {
      // Calculate delay
      const delayFactor = delay / 1000; // A value between 0-1
      let progress = Math.max(
        0,
        (value - delayFactor) * (1 / (1 - delayFactor)),
      );
      progress = Math.min(1, progress); // Limit between 0-1

      // Animated end angle
      const currentEndAngle = startAngle + (endAngle - startAngle) * progress;

      // Inner slice path - shorter and less descending
      if (progress > 0) {
        const innerArc = [
          // Start from the inner edge of the outer arc
          `M ${polarToCartesian(center, center, outerRadius, startAngle).x} ${
            polarToCartesian(center, center, outerRadius, startAngle).y
          }`,
          // Go along the inner edge of the outer arc
          `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${
            polarToCartesian(center, center, outerRadius, currentEndAngle).x
          } ${
            polarToCartesian(center, center, outerRadius, currentEndAngle).y
          }`,
          // Go towards the inner arc
          `L ${
            polarToCartesian(center, center, innerRadius, currentEndAngle).x
          } ${
            polarToCartesian(center, center, innerRadius, currentEndAngle).y
          }`,
          // Go along the inner arc
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${
            polarToCartesian(center, center, innerRadius, startAngle).x
          } ${polarToCartesian(center, center, innerRadius, startAngle).y}`,
          // Return to the starting point
          'Z',
        ].join(' ');

        setPathD(innerArc);
      }
    });

    return () => {
      animationProgress.removeListener(listener);
    };
  }, [
    animationProgress,
    startAngle,
    endAngle,
    outerRadius,
    innerRadius,
    center,
    largeArcFlag,
    delay,
  ]);

  return <Path d={pathD} fill={fill} stroke="none" />;
};

export default AnimatedInnerPath;
