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
var react_native_svg_1 = require("react-native-svg");
var ChartUtils_1 = require("../utils/ChartUtils");
var AnimatedArcPath = function (_a) {
    var startAngle = _a.startAngle, endAngle = _a.endAngle, radius = _a.radius, center = _a.center, strokeWidth = _a.strokeWidth, stroke = _a.stroke, animationProgress = _a.animationProgress, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
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
            // Start and end points for the arc
            var start = (0, ChartUtils_1.polarToCartesian)(center, center, radius, startAngle);
            var end = (0, ChartUtils_1.polarToCartesian)(center, center, radius, currentEndAngle);
            // Large arc flag
            var largeArcFlag = currentEndAngle - startAngle <= 180 ? 0 : 1;
            // Arc path
            var arc = [
                "M ".concat(start.x, " ").concat(start.y),
                "A ".concat(radius, " ").concat(radius, " 0 ").concat(largeArcFlag, " 1 ").concat(end.x, " ").concat(end.y),
            ].join(' ');
            setPathD(arc);
        });
        return function () {
            animationProgress.removeListener(listener);
        };
    }, [animationProgress, startAngle, endAngle, radius, center, delay]);
    return (<react_native_svg_1.Path d={pathD} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" fill="none"/>);
};
exports.default = AnimatedArcPath;
