import React from 'react';
import {View, ScrollView} from 'react-native';
import {LegendProps} from '../types/StorageTypes';
import {styles} from '../styles/ChartStyles';
import AnimatedLegendItem from './AnimatedLegendItem';

const Legend = ({
  data,
  isDarkMode,
  showEmptySpace = false,
  totalStorage = 100,
  emptySpaceTitle = 'Empty Space', // Default title for empty space
  unit = 'GB', // Default unit is GB
}: LegendProps) => {
  // Calculate total used space
  const totalUsed = data.reduce((total, item) => total + item.size, 0);

  // Empty space amount
  const emptyStorage = totalStorage - totalUsed;

  // Base value for percentage calculation
  const baseValue = showEmptySpace ? totalStorage : totalUsed;

  // Maximum height for scrollability - adjusted to fit 5 items
  const maxHeight = 350; // Increased maximum height
  const needsScrolling =
    data.length > 5 || (showEmptySpace && data.length >= 5); // Make scrollable if more than 5 items

  // Legend item for empty space
  const emptySpaceItem = {
    name: emptySpaceTitle,
    size: emptyStorage,
    color: isDarkMode ? '#444444' : '#e0e0e0',
    gradientStart: isDarkMode ? '#444444' : '#e0e0e0',
    gradientEnd: isDarkMode ? '#444444' : '#e0e0e0',
    innerColor: isDarkMode
      ? 'rgba(68, 68, 68, 0.2)'
      : 'rgba(224, 224, 224, 0.2)',
  };

  return (
    <View style={[styles.legendContainer, needsScrolling && {maxHeight}]}>
      <ScrollView
        showsVerticalScrollIndicator={false} // Removed scroll indicator
        contentContainerStyle={styles.legendScrollContent}
        decelerationRate="normal" // Reduced scroll speed (normal = 0.998, fast = 0.99)
        scrollEventThrottle={16} // For smoother scrolling
        keyboardDismissMode="on-drag" // Close keyboard during scrolling
        bounces={false} // Disable bounce effect at boundaries
        overScrollMode="never" // Disable over-scroll effect on Android
      >
        {data.map((item, index) => {
          // Calculate percentage
          const percentage = ((item.size / baseValue) * 100).toFixed(1);

          return (
            <AnimatedLegendItem
              key={index.toString()}
              item={item}
              percentage={percentage}
              index={index}
              isDarkMode={isDarkMode}
              animationDelay={index * 100 + 500} // Start after chart animation
              unit={unit} // Pass the unit prop
            />
          );
        })}

        {/* Empty space legend item - always at the bottom */}
        {showEmptySpace && emptyStorage > 0 && (
          <AnimatedLegendItem
            key="empty-space"
            item={emptySpaceItem}
            percentage={((emptyStorage / totalStorage) * 100).toFixed(1)}
            index={data.length}
            isDarkMode={isDarkMode}
            animationDelay={(data.length + 1) * 100 + 500} // Last animation
            unit={unit} // Pass the unit prop
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Legend;
