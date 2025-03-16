"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var ChartStyles_1 = require("../styles/ChartStyles");
var AnimatedLegendItem_1 = __importDefault(require("./AnimatedLegendItem"));
var Legend = function (_a) {
    var data = _a.data, isDarkMode = _a.isDarkMode, _b = _a.showEmptySpace, showEmptySpace = _b === void 0 ? false : _b, _c = _a.totalStorage, totalStorage = _c === void 0 ? 100 : _c, _d = _a.emptySpaceTitle, emptySpaceTitle = _d === void 0 ? 'Empty Space' : _d;
    // Calculate total used space
    var totalUsed = data.reduce(function (total, item) { return total + item.size; }, 0);
    // Empty space amount
    var emptyStorage = totalStorage - totalUsed;
    // Base value for percentage calculation
    var baseValue = showEmptySpace ? totalStorage : totalUsed;
    // Maximum height for scrollability - adjusted to fit 5 items
    var maxHeight = 350; // Increased maximum height
    var needsScrolling = data.length > 5 || (showEmptySpace && data.length >= 5); // Make scrollable if more than 5 items
    // Legend item for empty space
    var emptySpaceItem = {
        name: emptySpaceTitle,
        size: emptyStorage,
        color: isDarkMode ? '#444444' : '#e0e0e0',
        gradientStart: isDarkMode ? '#444444' : '#e0e0e0',
        gradientEnd: isDarkMode ? '#444444' : '#e0e0e0',
        innerColor: isDarkMode
            ? 'rgba(68, 68, 68, 0.2)'
            : 'rgba(224, 224, 224, 0.2)',
    };
    return (<react_native_1.View style={[ChartStyles_1.styles.legendContainer, needsScrolling && { maxHeight: maxHeight }]}>
      <react_native_1.ScrollView showsVerticalScrollIndicator={false} // Removed scroll indicator
     contentContainerStyle={ChartStyles_1.styles.legendScrollContent} decelerationRate="normal" // Reduced scroll speed (normal = 0.998, fast = 0.99)
     scrollEventThrottle={16} // For smoother scrolling
     keyboardDismissMode="on-drag" // Close keyboard during scrolling
     bounces={false} // Disable bounce effect at boundaries
     overScrollMode="never" // Disable over-scroll effect on Android
    >
        {data.map(function (item, index) {
            // Calculate percentage
            var percentage = ((item.size / baseValue) * 100).toFixed(1);
            return (<AnimatedLegendItem_1.default key={index.toString()} item={item} percentage={percentage} index={index} isDarkMode={isDarkMode} animationDelay={index * 100 + 500} // Start after chart animation
            />);
        })}

        {/* Empty space legend item - always at the bottom */}
        {showEmptySpace && emptyStorage > 0 && (<AnimatedLegendItem_1.default key="empty-space" item={emptySpaceItem} percentage={((emptyStorage / totalStorage) * 100).toFixed(1)} index={data.length} isDarkMode={isDarkMode} animationDelay={(data.length + 1) * 100 + 500} // Last animation
        />)}
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
exports.default = Legend;
