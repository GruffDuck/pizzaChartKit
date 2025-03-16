"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polarToCartesian = exports.getChartDimensions = exports.gapAngle = void 0;
var react_native_1 = require("react-native");
// Gap between slices (in degrees)
exports.gapAngle = 10; // We brought the slices closer together
// SVG dimensions - no longer fixed, will be calculated based on screen width
var getChartDimensions = function () {
    var screenWidth = react_native_1.Dimensions.get('window').width;
    var chartSize = Math.min(screenWidth * 0.85, 300); // 85% of screen width, maximum 300
    var strokeWidth = Math.max(chartSize * 0.05, 10); // Stroke width based on size, minimum 10
    var radius = (chartSize - strokeWidth) / 2;
    var innerRadius = radius * 0.5; // 50% of radius
    var center = chartSize / 2;
    return {
        size: chartSize,
        strokeWidth: strokeWidth,
        radius: radius,
        innerRadius: innerRadius,
        center: center,
    };
};
exports.getChartDimensions = getChartDimensions;
// Convert polar coordinates to cartesian coordinates
var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
};
exports.polarToCartesian = polarToCartesian;
