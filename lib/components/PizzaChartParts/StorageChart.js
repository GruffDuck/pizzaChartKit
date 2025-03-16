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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-native/no-inline-styles */
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_svg_1 = __importStar(require("react-native-svg"));
var ChartStyles_1 = require("../styles/ChartStyles");
var ChartUtils_1 = require("../utils/ChartUtils");
var AnimatedArcPath_1 = __importDefault(require("./AnimatedArcPath"));
var AnimatedInnerPath_1 = __importDefault(require("./AnimatedInnerPath"));
var Legend_1 = __importDefault(require("./Legend"));
var StorageChart = function (_a) {
    var data = _a.data, _b = _a.totalStorage, totalStorage = _b === void 0 ? 128 : _b, _c = _a.animationDuration, animationDuration = _c === void 0 ? 1000 : _c, _d = _a.animationSpeed, animationSpeed = _d === void 0 ? 1 : _d, // Default speed 1 (normal speed)
    _e = _a.showLegend, // Default speed 1 (normal speed)
    showLegend = _e === void 0 ? true : _e, // Legend is shown by default
    _f = _a.showEmptySpace, // Legend is shown by default
    showEmptySpace = _f === void 0 ? false : _f, // Empty space is not shown by default
    _g = _a.showPizza, // Empty space is not shown by default
    showPizza = _g === void 0 ? true : _g, // Pizza slices are shown by default
    _h = _a.title, // Pizza slices are shown by default
    title = _h === void 0 ? 'Storage Chart' : _h, // Default title
    _j = _a.emptySpaceTitle, // Default title
    emptySpaceTitle = _j === void 0 ? 'Empty Space' : _j;
    var isDarkMode = (0, react_native_1.useColorScheme)() === 'dark';
    var animationProgress = (0, react_1.useState)(new react_native_1.Animated.Value(0))[0];
    var _k = (0, react_1.useState)((0, ChartUtils_1.getChartDimensions)()), dimensions = _k[0], setDimensions = _k[1];
    var _l = (0, react_1.useState)('0.0'), displayValue = _l[0], setDisplayValue = _l[1];
    // Calculate total used space
    var usedStorage = data.reduce(function (total, item) { return total + item.size; }, 0);
    // Empty space amount
    var emptyStorage = totalStorage - usedStorage;
    // Recalculate when screen size changes
    (0, react_1.useEffect)(function () {
        var updateDimensions = function () {
            setDimensions((0, ChartUtils_1.getChartDimensions)());
        };
        // Listen for initial render and screen rotation events
        // Dimensions API has changed in newer versions of React Native
        var subscription = react_native_1.Dimensions.addEventListener('change', updateDimensions);
        return function () {
            // Cleanup
            subscription.remove();
        };
    }, []);
    // Watch animation value
    (0, react_1.useEffect)(function () {
        var listener = animationProgress.addListener(function (_a) {
            var value = _a.value;
            // Animated value
            var currentValue = (usedStorage * value).toFixed(1);
            setDisplayValue(currentValue);
        });
        return function () {
            animationProgress.removeListener(listener);
        };
    }, [animationProgress, usedStorage]);
    (0, react_1.useEffect)(function () {
        // Start animation
        react_native_1.Animated.timing(animationProgress, {
            toValue: 1,
            duration: animationDuration / animationSpeed,
            useNativeDriver: false,
            easing: react_native_1.Easing.out(react_native_1.Easing.cubic), // Added easing for smoother animation
        }).start();
        return function () {
            // Cleanup
            animationProgress.stopAnimation();
        };
    }, [animationProgress, animationDuration, animationSpeed]);
    // Create slices
    var slices = [];
    var defs = [];
    // Prepare data for empty space
    var allData = __spreadArray([], data, true);
    if (showEmptySpace && emptyStorage > 0) {
        // Add data for empty space - normal color
        allData.push({
            name: emptySpaceTitle,
            size: emptyStorage,
            color: isDarkMode ? '#444444' : '#e0e0e0',
            gradientStart: isDarkMode ? '#444444' : '#e0e0e0',
            gradientEnd: isDarkMode ? '#444444' : '#e0e0e0',
            innerColor: isDarkMode
                ? 'rgba(68, 68, 68, 0.2)'
                : 'rgba(224, 224, 224, 0.2)',
        });
    }
    var currentAngle = 0;
    // Total area (including or excluding empty space)
    var totalSize = showEmptySpace ? totalStorage : usedStorage;
    // Create slice for each storage item
    allData.forEach(function (item, index) {
        // Gradient definition
        var gradientId = "gradient-".concat(index);
        defs.push(<react_native_svg_1.LinearGradient key={gradientId} id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <react_native_svg_1.Stop offset="0%" stopColor={item.gradientStart || item.color}/>
        <react_native_svg_1.Stop offset="100%" stopColor={item.gradientEnd || item.color}/>
      </react_native_svg_1.LinearGradient>);
        // Calculate angle range for this slice
        var sweepAngle = (item.size / totalSize) * (360 - allData.length * ChartUtils_1.gapAngle);
        // Start and end angles for the slice
        var startAngle = currentAngle;
        var endAngle = currentAngle + sweepAngle;
        // Large arc flag
        var largeArcFlag = sweepAngle <= 180 ? 0 : 1;
        // Outer arc
        slices.push(<react_native_svg_1.G key={"slice-".concat(index)}>
        <AnimatedArcPath_1.default startAngle={startAngle} endAngle={endAngle} radius={dimensions.radius} center={dimensions.center} strokeWidth={dimensions.strokeWidth} stroke={"url(#".concat(gradientId, ")")} animationProgress={animationProgress} delay={index * (100 / animationSpeed)} // Adjust delay based on speed
        />
        {showPizza && (<AnimatedInnerPath_1.default startAngle={startAngle} endAngle={endAngle} outerRadius={dimensions.radius - dimensions.strokeWidth / 2} innerRadius={dimensions.innerRadius} center={dimensions.center} fill={item.innerColor || "".concat(item.color, "20")} // Inner color or default transparent color
             animationProgress={animationProgress} largeArcFlag={largeArcFlag} delay={(index * 100 + 50) / animationSpeed} // Slightly after outer arc
            />)}
      </react_native_svg_1.G>);
        // Update angle for next slice
        currentAngle = endAngle + ChartUtils_1.gapAngle;
    });
    // Adjust title and text sizes based on screen size
    var titleFontSize = Math.max(dimensions.size * 0.09, 20); // Minimum 20
    var centerTextFontSize = Math.max(dimensions.size * 0.08, 18); // Minimum 18
    var totalTextFontSize = Math.max(dimensions.size * 0.06, 14); // Minimum 14
    return (<react_native_1.View style={ChartStyles_1.styles.chartContainerWithLegend}>
      {/* Title - now inside the component */}
      <react_native_1.Text style={[
            ChartStyles_1.styles.title,
            {
                color: isDarkMode ? '#FFFFFF' : '#333333',
                fontSize: titleFontSize,
            },
        ]}>
        {title}
      </react_native_1.Text>

      <react_native_1.View style={[
            ChartStyles_1.styles.chartContainer,
            { width: dimensions.size, height: dimensions.size },
        ]}>
        <react_native_svg_1.default width={dimensions.size} height={dimensions.size}>
          <react_native_svg_1.Defs>{defs}</react_native_svg_1.Defs>
          {slices}
        </react_native_svg_1.default>
        {/* Center text */}
        <react_native_1.View style={ChartStyles_1.styles.centerTextContainer}>
          <react_native_1.Text style={[
            ChartStyles_1.styles.centerText,
            {
                color: isDarkMode ? '#FFFFFF' : '#333333',
                fontSize: centerTextFontSize,
            },
        ]}>
            {"".concat(displayValue, " GB")}
          </react_native_1.Text>
          {showEmptySpace && (<react_native_1.Text style={[
                ChartStyles_1.styles.totalStorageText,
                {
                    color: isDarkMode ? '#AAAAAA' : '#666666',
                    fontSize: totalTextFontSize,
                },
            ]}>
              {"/ ".concat(totalStorage, " GB")}
            </react_native_1.Text>)}
        </react_native_1.View>
      </react_native_1.View>

      {/* Legend component - controlled by showLegend prop */}
      {showLegend && (<Legend_1.default data={data} isDarkMode={isDarkMode} showEmptySpace={showEmptySpace} totalStorage={totalStorage} emptySpaceTitle={emptySpaceTitle}/>)}
    </react_native_1.View>);
};
exports.default = StorageChart;
