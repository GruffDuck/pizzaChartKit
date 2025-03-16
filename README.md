# React Native Pizza Chart

![Pizza Chart Demo](https://raw.githubusercontent.com/GruffDuck/pizzaChartKit/main/src/assets/ss.png)

A customizable and animated pizza chart component for React Native applications.

## Features

- 🍕 Beautiful animated pizza chart with customizable slices
- 📊 Animated legend with scrollable items
- 🎨 Customizable colors, gradients, and animations
- 🌓 Dark mode support
- 📱 Responsive design that adapts to different screen sizes
- ⚙️ Highly configurable with many customization options

## Installation

```bash
npm install react-native-pizza-chart
# or
yarn add react-native-pizza-chart
```

### Dependencies

This package requires `react-native-svg` as a peer dependency:

```bash
npm install react-native-svg
# or
yarn add react-native-svg
```

## Usage

```jsx
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { StorageChart, defaultStorageData } from 'react-native-pizza-chart';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <StorageChart
          data={defaultStorageData}
          totalStorage={100}
          animationDuration={1500}
          animationSpeed={1.5}
          showEmptySpace={true}
          showPizza={true}
          showLegend={true}
          title="Storage Chart"
          emptySpaceTitle="Free Space"
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `StorageItem[]` | Required | Array of data items to display in the chart |
| `totalStorage` | `number` | `128` | Total storage capacity |
| `animationDuration` | `number` | `1000` | Duration of the animation in milliseconds |
| `animationSpeed` | `number` | `1` | Speed multiplier for the animation |
| `showLegend` | `boolean` | `true` | Whether to show the legend |
| `showEmptySpace` | `boolean` | `false` | Whether to show empty space as a slice |
| `showPizza` | `boolean` | `true` | Whether to show the pizza slices |
| `title` | `string` | `'Storage Chart'` | Title of the chart |
| `emptySpaceTitle` | `string` | `'Empty Space'` | Title for the empty space slice |

## Data Format

Each item in the `data` array should follow this format:

```typescript
type StorageItem = {
  name: string;       // Name of the item
  size: number;       // Size of the item
  color: string;      // Main color (hex or rgba)
  gradientStart: string; // Gradient start color
  gradientEnd: string;   // Gradient end color
  innerColor: string;    // Color for the inner part of the slice
};
```

## Customization

You can customize the appearance of the chart by modifying the data items or by using the provided props.

### Example with Custom Data

```jsx
const customData = [
  {
    name: 'Photos',
    size: 32.5,
    color: '#FF6B6B',
    gradientStart: '#FF8E8E',
    gradientEnd: '#FF5252',
    innerColor: 'rgba(255, 107, 107, 0.2)',
  },
  {
    name: 'Videos',
    size: 45.2,
    color: '#4ECDC4',
    gradientStart: '#6BE3DA',
    gradientEnd: '#41B3AC',
    innerColor: 'rgba(78, 205, 196, 0.2)',
  },
  // Add more items as needed
];

// Then use it in your component
<StorageChart data={customData} totalStorage={128} />
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
