import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Profile({ navigation }: any) {

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Simple Header — back button only, no hamburger ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Hero Banner ── */}
        <LinearGradient
          colors={['#1a2a6c', '#2a4aac', '#3a5adc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroBanner}
        >
          <View style={styles.truckImageWrapper}>
            <Image
              source={require('../images/plate1.png')}
              style={styles.truckImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.platePill}>
            <Text style={styles.platePillText}>BLK EFL BLUE 2693</Text>
          </View>
        </LinearGradient>

        {/* ── Info Cards ── */}
        <View style={styles.content}>

          {/* Truck Name */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Text style={styles.infoIconText}>TN</Text>
            </View>
            <View style={styles.infoCardRight}>
              <Text style={styles.infoLabel}>TRUCK NAME</Text>
              <Text style={styles.infoValue}>Lorry Box Truck Isu Zu</Text>
            </View>
          </View>

          {/* Plate Number */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Text style={styles.infoIconText}>PL</Text>
            </View>
            <View style={styles.infoCardRight}>
              <Text style={styles.infoLabel}>PLATE NUMBER</Text>
              <Text style={[styles.infoValue, styles.monoText]}>BLK EFL BLUE 2693</Text>
            </View>
          </View>

          {/* Truck Details */}
          <View style={[styles.infoCard, styles.detailsCard]}>
            <View style={styles.detailsHeader}>
              <View style={styles.infoIconCircle}>
                <Text style={styles.infoIconText}>TD</Text>
              </View>
              <Text style={styles.infoLabel}>TRUCK DETAILS</Text>
            </View>
            <Text style={styles.detailsText}>
              Isu Zu 5 Ton Truck 6 Wheeler Cargo Van Mini Lorry Truck Euro2 Diesel 4X2 Cargo Truck
            </Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <LinearGradient colors={['#1a2a6c', '#2a4aac']} style={styles.statCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.statValue}>5 Ton</Text>
              <Text style={styles.statLabel}>Capacity</Text>
            </LinearGradient>
            <LinearGradient colors={['#1a2a6c', '#2a4aac']} style={styles.statCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Wheels</Text>
            </LinearGradient>
            <LinearGradient colors={['#1a2a6c', '#2a4aac']} style={styles.statCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.statValue}>4X2</Text>
              <Text style={styles.statLabel}>Drive</Text>
            </LinearGradient>
          </View>

          {/* Fuel Type */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Text style={styles.infoIconText}>FL</Text>
            </View>
            <View style={styles.infoCardRight}>
              <Text style={styles.infoLabel}>FUEL TYPE</Text>
              <Text style={styles.infoValue}>Euro2 Diesel</Text>
            </View>
          </View>

          {/* ── Sign Out Button ── */}
          <TouchableOpacity
            style={styles.signOutBtn}
            onPress={handleSignOut}
            activeOpacity={0.85}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f8',
  },

  // Simple header — back button only
  header: {
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight ?? 0) + 12,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 4,
  },
  backText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },

  // Hero banner
  heroBanner: {
    width: '100%',
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 16,
  },
  truckImageWrapper: {
    width: width * 0.7,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  truckImage: {
    width: '100%',
    height: '100%',
  },
  platePill: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  platePillText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // Content
  content: {
    padding: 20,
    gap: 12,
    marginTop: -20,
  },

  // Info card
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#1a2a6c',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
  },
  infoCardRight: {
    flex: 1,
    gap: 3,
  },
  infoIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#e8eeff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a2a6c',
    letterSpacing: 0.5,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8a9abc',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2a6c',
  },
  monoText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 1,
  },

  // Details card
  detailsCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  detailsText: {
    fontSize: 13,
    color: '#4a5a7c',
    lineHeight: 22,
    paddingLeft: 4,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#1a2a6c',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.5,
  },

  // Sign Out
  signOutBtn: {
    backgroundColor: '#c62828',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#c62828',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
});