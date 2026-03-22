import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import Header from '../components/Header';

const TActivity = ({ navigation, route }: any) => {
  const { plateNumber } = route?.params ?? { plateNumber: 'UNKNOWN' };

  const [date,       setDate]       = useState('');
  const [farm,       setFarm]       = useState('');
  const [address,    setAddress]    = useState('');
  const [callTime,   setCallTime]   = useState('');
  const [plant,      setPlant]      = useState('');
  const [driverName, setDriverName] = useState('');
  const [departure,  setDeparture]  = useState('');
  const [arrival,    setArrival]    = useState('');

  const handleSubmitDetails  = () => console.log('Details submitted:', { date, farm, address, callTime, plant, driverName });
  const handleSubmitDeparture = () => console.log('Departure submitted:', departure);
  const handleSubmitArrival   = () => console.log('Arrival submitted:', arrival);

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2a6c" translucent />

      {/* ── Header — hamburger always visible ── */}
      <Header navigation={navigation} showBack={false} />

      {/* ── Title Card ── */}
      <View style={styles.titleCard}>
        {/* ── Back button — below header ── */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
        <Text style={styles.plateLabel}>
          PLATE NUMBER:{'   '}
          <Text style={styles.plateValue}>{plateNumber}</Text>
        </Text>
        <Text style={styles.screenTitle}>Truck Activity</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>Please enter the following details</Text>

        {/* Details Form */}
        <View style={styles.formCard}>
          <TextInput style={styles.input} placeholder="Date"                   placeholderTextColor="#aab0c0" value={date}       onChangeText={setDate}       />
          <TextInput style={styles.input} placeholder="Farm"                   placeholderTextColor="#aab0c0" value={farm}       onChangeText={setFarm}       />
          <TextInput style={styles.input} placeholder="Address"                placeholderTextColor="#aab0c0" value={address}    onChangeText={setAddress}    />
          <TextInput style={styles.input} placeholder="Call Time (e.g. 08:30 AM)" placeholderTextColor="#aab0c0" value={callTime}  onChangeText={setCallTime}  />
          <TextInput style={styles.input} placeholder="Plant"                  placeholderTextColor="#aab0c0" value={plant}      onChangeText={setPlant}      />
          <TextInput style={styles.input} placeholder="Driver's Name"          placeholderTextColor="#aab0c0" value={driverName} onChangeText={setDriverName} />

          <TouchableOpacity style={styles.submitBtnRight} onPress={handleSubmitDetails} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Departure & Arrival */}
        <View style={styles.timeRow}>

          <View style={styles.timeCard}>
            <Text style={styles.timeLabel}>Departure</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="00:00 AM"
              placeholderTextColor="#1a2a6c"
              value={departure}
              onChangeText={setDeparture}
              textAlign="center"
            />
            <TouchableOpacity style={styles.timeSubmitBtn} onPress={handleSubmitDeparture} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timeCard}>
            <Text style={styles.timeLabel}>Arrival</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="00:00 AM"
              placeholderTextColor="#1a2a6c"
              value={arrival}
              onChangeText={setArrival}
              textAlign="center"
            />
            <TouchableOpacity style={styles.timeSubmitBtn} onPress={handleSubmitArrival} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default TActivity;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a6c',
  },

  // Back button — inside title card, below header
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    marginBottom: 10,
  },
  backText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },

  // Title Card
  titleCard: {
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
  },
  plateLabel: {
    fontSize: 10,
    color: '#c9a84c',
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
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
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },

  // Scroll
  scrollView: {
    flex: 1,
    backgroundColor: '#e8edf5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#5a6a8c',
    marginBottom: 14,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  // Form Card
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 18,
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    height: 46,
    borderRadius: 8,
    backgroundColor: '#f0f3f8',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#1a2a6c',
    marginBottom: 10,
  },
  submitBtnRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Time Row
  timeRow: {
    flexDirection: 'row',
    gap: 14,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeLabel: {
    fontSize: 12,
    color: '#5a6a8c',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  timeInput: {
    width: '100%',
    height: 44,
    backgroundColor: '#f0f3f8',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#1a2a6c',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textAlign: 'center',
  },
  timeSubmitBtn: {
    width: '100%',
    backgroundColor: '#1a2a6c',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});