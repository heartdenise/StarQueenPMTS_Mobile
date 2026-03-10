import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

const Dashboard = ({ navigation, route }: any) => {
  const { plateNumber } = route?.params ?? { plateNumber: 'UNKNOWN' };

  // Set to true when odometer needs updating — connect to backend later
  const odometorNeedsUpdate = true;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2a6c" />

     <Header navigation={navigation} showBack={true} />
      {/* Body */}
      <View style={styles.body}>

        {/* Truck Plate Card */}
        <View style={styles.plateCard}>
          {/* Top shine strip */}
          <View style={styles.plateShine} />
          <Text style={styles.plateLabel}>TRUCK PLATE NUMBER</Text>
          <Text style={styles.plateNumber}>{plateNumber}</Text>
          
        </View>

        {/* Menu Cards */}
        <View style={styles.menuContainer}>

          <TouchableOpacity
            style={styles.menuCard}
           onPress={() => navigation.navigate('tActivity', { plateNumber })}
            activeOpacity={0.75}
          >
            <Text style={styles.menuCardText}>TRUCK ACTIVITY</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('tMaintenance', { plateNumber })}
            activeOpacity={0.75}
          >
            <Text style={styles.menuCardText}>TRUCK MAINTENANCE LOGS</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navigation.navigate('tExpense', { plateNumber })}
            activeOpacity={0.75}
          >
            <Text style={styles.menuCardText}>TRUCK EXPENSE</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          {/* Odometer with optional warning */}
          <TouchableOpacity
            style={[styles.menuCard, odometorNeedsUpdate && styles.menuCardWarning]}
            onPress={() => navigation.navigate('tOdometer', { plateNumber })}
            activeOpacity={0.75}
          >
            <View>
              <Text style={[styles.menuCardText, odometorNeedsUpdate && styles.menuCardTextWarning]}>
                TRUCK ODOMETER
              </Text>
              {odometorNeedsUpdate && (
                <Text style={styles.warningText}>⚠ Odometer update required</Text>
              )}
            </View>
            {odometorNeedsUpdate
              ? <View style={styles.warningBadge}><Text style={styles.warningBadgeText}>!</Text></View>
              : <Text style={styles.menuArrow}>›</Text>
            }
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a6c',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    padding: 4,
  },
  hamburger: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerIconText: {
    fontSize: 22,
    color: '#ffffff',
  },

  // Body
  body: {
    flex: 1,
    backgroundColor: '#e8edf5',
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
  },

  // Plate Card — premium gold
  plateCard: {
    width: '88%',
    backgroundColor: '#c9a84c',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 32,
    // Deep layered shadow for premium feel
    shadowColor: '#7a5c00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#e8c46a',
  },
  plateShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 38,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  plateLabel: {
    fontSize: 9,
    color: '#4a2e00',
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },
  plateNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1a1a00',
    letterSpacing: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  plateUnderline: {
    width: '70%',
    height: 1.5,
    backgroundColor: 'rgba(74,46,0,0.3)',
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 1,
  },
  plateStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  plateDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2e7d32',
  },
 
  // Menu Cards
  menuContainer: {
    width: '100%',
    gap: 14,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#1a2a6c',
  },
  menuCardWarning: {
    borderLeftColor: '#e07b00',
    backgroundColor: '#fffaf4',
  },
  menuCardText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1a2a6c',
    letterSpacing: 1.2,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-condensed',
  },
  menuCardTextWarning: {
    color: '#b35a00',
  },
  menuArrow: {
    fontSize: 26,
    color: '#c9a84c',
    fontWeight: '700',
  },
  warningText: {
    fontSize: 10,
    color: '#e07b00',
    fontWeight: '600',
    marginTop: 3,
    letterSpacing: 0.3,
  },
  warningBadge: {
    backgroundColor: '#e07b00',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningBadgeText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 15,
  },
  headerIconImage: {
  width: 24,
  height: 24,
  tintColor: '#ffffff',
},
});