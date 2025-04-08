import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {PizzaChart} from '../src/components/PizzaChartParts';
import {defaultStorageData} from '../src/components/utils/DefaultData';

export default function ExpoExample() {
  // Test configuration state
  const [showEmptySpace, setShowEmptySpace] = useState(true);
  const [showPizza, setShowPizza] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState('2');
  const [totalStorage, setTotalStorage] = useState('100');
  const [title, setTitle] = useState('Pizza Chart');
  const [emptySpaceTitle, setEmptySpaceTitle] = useState('Free Space');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>React Native Pizza Chart - Expo Example</Text>
        </View>

        <View style={styles.controlsContainer}>
          <Text style={styles.sectionTitle}>Chart Configuration</Text>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Empty Space:</Text>
            <Switch
              value={showEmptySpace}
              onValueChange={setShowEmptySpace}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showEmptySpace ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Pizza Slices:</Text>
            <Switch
              value={showPizza}
              onValueChange={setShowPizza}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showPizza ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Show Legend:</Text>
            <Switch
              value={showLegend}
              onValueChange={setShowLegend}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showLegend ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Animation Speed:</Text>
            <TextInput
              style={styles.textInput}
              value={animationSpeed}
              onChangeText={setAnimationSpeed}
              keyboardType="numeric"
              placeholder="Animation Speed"
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Total Storage:</Text>
            <TextInput
              style={styles.textInput}
              value={totalStorage}
              onChangeText={setTotalStorage}
              keyboardType="numeric"
              placeholder="Total Storage"
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Chart Title:</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Chart Title"
            />
          </View>

          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Empty Space Title:</Text>
            <TextInput
              style={styles.textInput}
              value={emptySpaceTitle}
              onChangeText={setEmptySpaceTitle}
              placeholder="Empty Space Title"
            />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <PizzaChart
            data={defaultStorageData}
            totalStorage={Number(totalStorage)}
            animationDuration={1000}
            animationSpeed={Number(animationSpeed)}
            showEmptySpace={showEmptySpace}
            showPizza={showPizza}
            showLegend={showLegend}
            title={title}
            emptySpaceTitle={emptySpaceTitle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#4dabf7',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  controlsContainer: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    margin: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 14,
    flex: 1,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginLeft: 8,
    color: '#333',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
}); 