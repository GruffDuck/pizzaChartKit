export declare const gapAngle = 10;
export declare const getChartDimensions: () => {
    size: number;
    strokeWidth: number;
    radius: number;
    innerRadius: number;
    center: number;
};
export declare const polarToCartesian: (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    x: number;
    y: number;
};
