import React, {useState, useEffect} from 'react';
import {Path} from 'react-native-svg';
import {AnimatedArcPathProps} from '../types/StorageTypes';
import {polarToCartesian} from '../utils/ChartUtils';

const AnimatedArcPath = ({
  startAngle,
  endAngle,
  radius,
  center,
  strokeWidth,
  stroke,
  animationProgress,
  delay = 0,
}: AnimatedArcPathProps) => {
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

      // Start and end points for the arc
      const start = polarToCartesian(center, center, radius, startAngle);
      const end = polarToCartesian(center, center, radius, currentEndAngle);

      // Large arc flag
      const largeArcFlag = currentEndAngle - startAngle <= 180 ? 0 : 1;

      // Arc path
      const arc = [
        `M ${start.x} ${start.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
      ].join(' ');

      setPathD(arc);
    });

    return () => {
      animationProgress.removeListener(listener);
    };
  }, [animationProgress, startAngle, endAngle, radius, center, delay]);

  return (
    <Path
      d={pathD}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
    />
  );
};

export default AnimatedArcPath;
