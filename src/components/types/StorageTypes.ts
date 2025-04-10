// Data type definition
export type StorageItem = {
  name: string;
  size: number;
  color: string;
  gradientStart: string;
  gradientEnd: string;
  innerColor: string;
};

// Animated arc component props
export type AnimatedArcPathProps = {
  startAngle: number;
  endAngle: number;
  radius: number;
  center: number;
  strokeWidth: number;
  stroke: string;
  animationProgress: Animated.Value;
  delay?: number;
};

// Animated inner slice component props
export type AnimatedInnerPathProps = {
  startAngle: number;
  endAngle: number;
  outerRadius: number;
  innerRadius: number;
  center: number;
  fill: string;
  animationProgress: Animated.Value;
  largeArcFlag: number;
  delay?: number;
};

// Animated legend item component props
export type AnimatedLegendItemProps = {
  item: StorageItem;
  percentage: string;
  index: number;
  isDarkMode: boolean;
  animationDelay?: number;
  unit?: string; // Added unit property with optional string type
};

// Legend component props
export type LegendProps = {
  data: StorageItem[];
  isDarkMode: boolean;
  showEmptySpace?: boolean;
  totalStorage?: number;
  emptySpaceTitle?: string; // New prop for empty space title
  unit?: string; // Added unit property with optional string type
};

// StorageChart component props
export type StorageChartProps = {
  data: StorageItem[];
  totalStorage?: number;
  animationDuration?: number;
  animationSpeed?: number; // New prop for animation speed
  showLegend?: boolean; // Show/hide legend
  showEmptySpace?: boolean; // Show/hide empty space
  showPizza?: boolean; // Show/hide pizza slices
  title?: string; // New prop for title
  emptySpaceTitle?: string; // New prop for empty space title
  unit?: string; // Added unit property with optional string type
};

import {Animated} from 'react-native';
