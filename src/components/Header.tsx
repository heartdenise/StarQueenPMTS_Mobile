import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const bellIcon = require('../images/bell.png');
const profileIcon = require('../images/profile.png');

const Header = ({ navigation, showBack = false }: any) => {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.leftBtn}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
      )}

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
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  leftBtn: {
    padding: 4,
  },
  hamburger: {
    fontSize: 24,
    color: '#ffffff',
  },
  backText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
});