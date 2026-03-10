import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTruck } from '../context/TruckContext';

const TOdometer = ({ navigation, route }: any) => {
  const plateNumber = route?.params?.plateNumber ?? 'UNKNOWN';
  const [input, setInput] = useState('');
  const truck = useTruck();

  function handlePress(val: string) {
    if (input.length >= 7) return;
    setInput(function(prev) { return prev + val; });
  }

  function handleDelete() {
    setInput(function(prev) { return prev.slice(0, -1); });
  }

  function handleClear() {
    setInput('');
  }

  function handleSubmit() {
    if (!input || isNaN(Number(input))) {
      Alert.alert('Invalid Input', 'Please enter a valid KM reading.');
      return;
    }
    if (truck && truck.setCurrentKm) {
      truck.setCurrentKm(Number(input));
    }
    Alert.alert('Success', 'Odometer reading saved: ' + input + ' KM', [
      { text: 'OK', onPress: function() { navigation.goBack(); } }
    ]);
  }

  const keys = ['1','2','3','4','5','6','7','8','9','X','0','DEL'];

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>
        <TouchableOpacity onPress={function() { navigation.goBack(); }} style={styles.backBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleCard}>
        <Text style={styles.plateLabel}>
          PLATE NUMBER:
          <Text style={styles.plateValue}>{'   ' + plateNumber}</Text>
        </Text>
        <Text style={styles.screenTitle}>Truck Odometer</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.instruction}>Enter the Total Kilometer of the Truck</Text>

        <View style={styles.displayBox}>
          <Text style={styles.displayText}>
            {input.length > 0 ? input + ' KM' : ''}
          </Text>
        </View>

        <View style={styles.numpad}>
          {keys.map(function(key) {
            const isX = key === 'X';
            const isDel = key === 'DEL';
            return (
              <TouchableOpacity
                key={key}
                style={isX || isDel ? styles.keySpecial : styles.key}
                onPress={function() {
                  if (isX) { handleClear(); }
                  else if (isDel) { handleDelete(); }
                  else { handlePress(key); }
                }}
                activeOpacity={0.7}
              >
                <Text style={isX || isDel ? styles.keyTextSpecial : styles.keyText}>
                  {key === 'DEL' ? '⌫' : key}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default TOdometer;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a2a6c' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1a2a6c',
  },
  backBtn: { paddingVertical: 4, paddingRight: 12 },
  backText: { fontSize: 14, color: '#ffffff', fontWeight: '600' },
  headerRight: { flexDirection: 'row', gap: 10 },
  iconBtn: { padding: 4 },
  iconText: { fontSize: 20, color: '#ffffff' },
  titleCard: {
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 4,
  },
  plateLabel: {
    fontSize: 10,
    color: '#c9a84c',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  plateValue: {
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 3,
    fontSize: 12,
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  body: {
    flex: 1,
    backgroundColor: '#e8edf5',
    paddingHorizontal: 24,
    paddingTop: 28,
    alignItems: 'center',
  },
  instruction: {
    fontSize: 13,
    color: '#5a6a8c',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  displayBox: {
    width: '100%',
    height: 64,
    backgroundColor: '#d8dfe8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  displayText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1a2a6c',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  numpad: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 14,
  },
  key: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: '#d0d8e8',
  },
  keySpecial: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f3f8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#c0c8d8',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a2a6c',
  },
  keyTextSpecial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5a6a8c',
  },
  footer: {
    backgroundColor: '#e8edf5',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  submitBtn: {
    backgroundColor: '#1a2a6c',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
});