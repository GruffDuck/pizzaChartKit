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
/* eslint-disable react-native/no-inline-styles */
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ChartStyles_1 = require("../styles/ChartStyles");
var AnimatedLegendItem = function (_a) {
    var item = _a.item, percentage = _a.percentage, isDarkMode = _a.isDarkMode, _b = _a.animationDelay, animationDelay = _b === void 0 ? 0 : _b;
    var opacity = (0, react_1.useState)(new react_native_1.Animated.Value(0))[0];
    var translateY = (0, react_1.useState)(new react_native_1.Animated.Value(20))[0];
    (0, react_1.useEffect)(function () {
        // Start animation
        react_native_1.Animated.parallel([
            react_native_1.Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay: animationDelay,
                useNativeDriver: true,
                easing: react_native_1.Easing.out(react_native_1.Easing.cubic),
            }),
            react_native_1.Animated.timing(translateY, {
                toValue: 0,
                duration: 500,
                delay: animationDelay,
                useNativeDriver: true,
                easing: react_native_1.Easing.out(react_native_1.Easing.cubic),
            }),
        ]).start();
    }, [opacity, translateY, animationDelay]);
    return (<react_native_1.Animated.View style={[
            ChartStyles_1.styles.legendItem,
            {
                backgroundColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.03)',
                opacity: opacity,
                transform: [{ translateY: translateY }],
            },
        ]}>
      <react_native_1.View style={ChartStyles_1.styles.legendLeftSection}>
        <react_native_1.View style={[
            ChartStyles_1.styles.legendColor,
            {
                backgroundColor: item.color,
                shadowColor: item.color,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 3,
            },
        ]}/>
        <react_native_1.Text style={[
            ChartStyles_1.styles.legendText,
            { color: isDarkMode ? '#FFFFFF' : '#333333' },
        ]}>
          {item.name}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={ChartStyles_1.styles.legendRightSection}>
        <react_native_1.Text style={[
            ChartStyles_1.styles.legendSize,
            { color: isDarkMode ? '#FFFFFF' : '#333333' },
        ]}>
          {"".concat(item.size, " GB")}
        </react_native_1.Text>
        <react_native_1.Text style={[
            ChartStyles_1.styles.legendPercentage,
            { color: isDarkMode ? '#CCCCCC' : '#666666' },
        ]}>
          {"".concat(percentage, "%")}
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.Animated.View>);
};
exports.default = AnimatedLegendItem;
