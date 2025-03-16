export type StorageItem = {
    name: string;
    size: number;
    color: string;
    gradientStart: string;
    gradientEnd: string;
    innerColor: string;
};
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
export type AnimatedLegendItemProps = {
    item: StorageItem;
    percentage: string;
    index: number;
    isDarkMode: boolean;
    animationDelay?: number;
};
export type LegendProps = {
    data: StorageItem[];
    isDarkMode: boolean;
    showEmptySpace?: boolean;
    totalStorage?: number;
    emptySpaceTitle?: string;
};
export type StorageChartProps = {
    data: StorageItem[];
    totalStorage?: number;
    animationDuration?: number;
    animationSpeed?: number;
    showLegend?: boolean;
    showEmptySpace?: boolean;
    showPizza?: boolean;
    title?: string;
    emptySpaceTitle?: string;
};
import { Animated } from 'react-native';
