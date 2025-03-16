import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  useColorScheme,
  Text,
  ScrollView,
  Switch,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  StorageChart,
  defaultStorageData,
} from 'react-native-pizza-chart';

const Example = () => {
  const isDarkMode = useColorScheme() === 'dark';
  
  // Test configuration state
  const [showEmptySpace, setShowEmptySpace] = useState(true);
  const [showPizza, setShowPizza] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState('2');
  const [totalStorage, setTotalStorage] = useState('100');
  const [title, setTitle] = useState('Storage Chart');
  const [emptySpaceTitle, setEmptySpaceTitle] = useState('Free Space');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#F3F3F3',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={[styles.headerText, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
            React Native Pizza Chart - Example
          </Text>
        </View>
        
        <View style={styles.controlsContainer}>
          <Text style={[styles.sectionTitle, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
            Chart Configuration
          </Text>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Show Empty Space:
            </Text>
            <Switch
              value={showEmptySpace}
              onValueChange={setShowEmptySpace}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showEmptySpace ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Show Pizza Slices:
            </Text>
            <Switch
              value={showPizza}
              onValueChange={setShowPizza}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showPizza ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Show Legend:
            </Text>
            <Switch
              value={showLegend}
              onValueChange={setShowLegend}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={showLegend ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Animation Speed:
            </Text>
            <TextInput
              style={[styles.textInput, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}
              value={animationSpeed}
              onChangeText={setAnimationSpeed}
              keyboardType="numeric"
              placeholder="Animation Speed"
              placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Total Storage:
            </Text>
            <TextInput
              style={[styles.textInput, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}
              value={totalStorage}
              onChangeText={setTotalStorage}
              keyboardType="numeric"
              placeholder="Total Storage"
              placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Chart Title:
            </Text>
            <TextInput
              style={[styles.textInput, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}
              value={title}
              onChangeText={setTitle}
              placeholder="Chart Title"
              placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
            />
          </View>
          
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}>
              Empty Space Title:
            </Text>
            <TextInput
              style={[styles.textInput, {color: isDarkMode ? '#FFFFFF' : '#333333'}]}
              value={emptySpaceTitle}
              onChangeText={setEmptySpaceTitle}
              placeholder="Empty Space Title"
              placeholderTextColor={isDarkMode ? '#AAAAAA' : '#999999'}
            />
          </View>
        </View>
        
        <View style={styles.container}>
          <View style={styles.chartWrapper}>
            <StorageChart
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
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
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    flex: 1,
    marginLeft: 8,
  },
});

export default Example; 