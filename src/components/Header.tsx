import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import { useTruck } from '../context/TruckContext';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.72;

const bellIcon    = require('../images/bell.png');
const profileIcon = require('../images/profile.png');

const menuItems = [
  { label: 'Dashboard',        screen: 'Dashboard'    },
  { label: 'Truck Activity',   screen: 'tActivity'    },
  { label: 'Maintenance Logs', screen: 'tMaintenance' },
  { label: 'Truck Expense',    screen: 'tExpense'     },
  { label: 'Truck Odometer',   screen: 'tOdometer'    },
];

const Header = ({ navigation, showBack = false, plateNumber }: any) => {
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const slideAnim   = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  // ✅ Read plateNumber from context as fallback
  const truck = useTruck();

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 80,
        friction: 10,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => setDrawerOpen(false));
  };

  // ✅ Always pass plateNumber — from prop first, then context fallback
  const navigateTo = (screen: string) => {
    closeDrawer();
    const plate = plateNumber || truck?.plateNumber || '';
    setTimeout(() => navigation.navigate(screen, { plateNumber: plate }), 250);
  };

  return (
    <>
      {/* ── Main Header Bar ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftBtn} onPress={openDrawer}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notification')}
          >
            <Image source={bellIcon} style={styles.iconImage} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image source={profileIcon} style={styles.iconImage} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Sidebar Drawer ── */}
      {drawerOpen && (
        <>
          {/* Dark overlay — tap anywhere to close */}
          <TouchableWithoutFeedback onPress={closeDrawer}>
            <Animated.View style={[styles.overlay, { opacity: overlayAnim }]} />
          </TouchableWithoutFeedback>

          {/* Drawer panel */}
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
          >
            {/* Drawer header */}
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerAppName}>StarQueen</Text>
              <Text style={styles.drawerSubtitle}>Truck Maintenance System</Text>
            </View>

            <View style={styles.drawerDivider} />

            {/* Menu items */}
            <View style={styles.drawerMenu}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.screen}
                  style={styles.drawerMenuItem}
                  onPress={() => navigateTo(item.screen)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.drawerMenuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  // Header bar
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight ?? 0) + 12,
    zIndex: 10,
  },
  leftBtn:     { padding: 4 },
  hamburger:   { fontSize: 24, color: '#ffffff' },
  headerRight: { flexDirection: 'row', gap: 12 },
  iconBtn:     { padding: 4 },
  iconImage:   { width: 24, height: 24, tintColor: '#ffffff' },

  // Overlay
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 98,
  },

  // Drawer
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height,
    backgroundColor: '#ffffff',
    zIndex: 99,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 4, height: 0 },
    shadowRadius: 16,
    elevation: 20,
  },

  // Drawer header
  drawerHeader: {
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 70 : (StatusBar.currentHeight ?? 0) + 24,
    paddingBottom: 28,
  },
  drawerAppName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  drawerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '400',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#e8eaf0',
    marginHorizontal: 20,
    marginVertical: 8,
  },

  // Menu items
  drawerMenu: {
    paddingTop: 8,
    flex: 1,
  },
  drawerMenuItem: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f2f8',
  },
  drawerMenuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a2a6c',
    letterSpacing: 0.2,
  },
});