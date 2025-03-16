import {Dimensions} from 'react-native';

// Gap between slices (in degrees)
export const gapAngle = 10; // We brought the slices closer together

// SVG dimensions - no longer fixed, will be calculated based on screen width
export const getChartDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartSize = Math.min(screenWidth * 0.85, 300); // 85% of screen width, maximum 300
  const strokeWidth = Math.max(chartSize * 0.05, 10); // Stroke width based on size, minimum 10
  const radius = (chartSize - strokeWidth) / 2;
  const innerRadius = radius * 0.5; // 50% of radius
  const center = chartSize / 2;

  return {
    size: chartSize,
    strokeWidth,
    radius,
    innerRadius,
    center,
  };
};

// Convert polar coordinates to cartesian coordinates
export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};
