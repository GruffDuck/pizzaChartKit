"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
// import { Animated } from 'react-native';
var react_native_svg_1 = require("react-native-svg");
var ChartUtils_1 = require("../utils/ChartUtils");
var AnimatedInnerPath = function (_a) {
    var startAngle = _a.startAngle, endAngle = _a.endAngle, outerRadius = _a.outerRadius, innerRadius = _a.innerRadius, center = _a.center, fill = _a.fill, animationProgress = _a.animationProgress, largeArcFlag = _a.largeArcFlag, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
    var _c = (0, react_1.useState)(''), pathD = _c[0], setPathD = _c[1];
    (0, react_1.useEffect)(function () {
        // Watch animation value
        var listener = animationProgress.addListener(function (_a) {
            var value = _a.value;
            // Calculate delay
            var delayFactor = delay / 1000; // A value between 0-1
            var progress = Math.max(0, (value - delayFactor) * (1 / (1 - delayFactor)));
            progress = Math.min(1, progress); // Limit between 0-1
            // Animated end angle
            var currentEndAngle = startAngle + (endAngle - startAngle) * progress;
            // Inner slice path - shorter and less descending
            if (progress > 0) {
                var innerArc = [
                    // Start from the inner edge of the outer arc
                    "M ".concat((0, ChartUtils_1.polarToCartesian)(center, center, outerRadius, startAngle).x, " ").concat((0, ChartUtils_1.polarToCartesian)(center, center, outerRadius, startAngle).y),
                    // Go along the inner edge of the outer arc
                    "A ".concat(outerRadius, " ").concat(outerRadius, " 0 ").concat(largeArcFlag, " 1 ").concat((0, ChartUtils_1.polarToCartesian)(center, center, outerRadius, currentEndAngle).x, " ").concat((0, ChartUtils_1.polarToCartesian)(center, center, outerRadius, currentEndAngle).y),
                    // Go towards the inner arc
                    "L ".concat((0, ChartUtils_1.polarToCartesian)(center, center, innerRadius, currentEndAngle).x, " ").concat((0, ChartUtils_1.polarToCartesian)(center, center, innerRadius, currentEndAngle).y),
                    // Go along the inner arc
                    "A ".concat(innerRadius, " ").concat(innerRadius, " 0 ").concat(largeArcFlag, " 0 ").concat((0, ChartUtils_1.polarToCartesian)(center, center, innerRadius, startAngle).x, " ").concat((0, ChartUtils_1.polarToCartesian)(center, center, innerRadius, startAngle).y),
                    // Return to the starting point
                    'Z',
                ].join(' ');
                setPathD(innerArc);
            }
        });
        return function () {
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
    return <react_native_svg_1.Path d={pathD} fill={fill} stroke="none"/>;
};
exports.default = AnimatedInnerPath;
