import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

const typeConfig = {
  urgent:  { bg: '#ffe5e5', badge: '#e53935', label: 'urgent',  borderColor: '#f5c6c6' },
  warning: { bg: '#fff8e1', badge: '#f59f00', label: 'warning', borderColor: '#f5e6b2' },
  info:    { bg: '#e8f0fe', badge: '#1a73e8', label: 'info',    borderColor: '#c5d8fa' },
};

export default function Notification({ navigation }: any) {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Simple Header — back button only ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Title Row ── */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <Text style={styles.pageSubtitle}>Stay updated with system alerts and reminders</Text>
          </View>
        </View>

        {/* ── Filter Summary Cards ── */}
        <View style={styles.filterSection}>

          <View style={[styles.filterCard, styles.filterCardUrgent]}>
            <View style={[styles.filterIcon, { backgroundColor: '#e53935' }]}>
              <Text style={styles.filterIconText}>!</Text>
            </View>
            <View style={styles.filterCardRight}>
              <Text style={styles.filterLabel}>Urgent Alerts</Text>
              <Text style={[styles.filterCount, { color: '#e53935' }]}>0</Text>
            </View>
          </View>

          <View style={[styles.filterCard, styles.filterCardWarning]}>
            <View style={[styles.filterIcon, { backgroundColor: '#f59f00' }]}>
              <Text style={styles.filterIconText}>!</Text>
            </View>
            <View style={styles.filterCardRight}>
              <Text style={styles.filterLabel}>Warnings</Text>
              <Text style={[styles.filterCount, { color: '#f59f00' }]}>0</Text>
            </View>
          </View>

          <View style={[styles.filterCard, styles.filterCardInfo]}>
            <View style={[styles.filterIcon, { backgroundColor: '#1a73e8' }]}>
              <Text style={styles.filterIconText}>i</Text>
            </View>
            <View style={styles.filterCardRight}>
              <Text style={styles.filterLabel}>Information</Text>
              <Text style={[styles.filterCount, { color: '#1a73e8' }]}>0</Text>
            </View>
          </View>

        </View>

        {/* ── All Notifications — empty until database connected ── */}
        <View style={styles.allNotifsSection}>
          <View style={styles.allNotifsHeader}>
            <Text style={styles.allNotifsTitle}>All notifications</Text>
          </View>

          {/* Empty state */}
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              Notifications will appear here once connected to the database.
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  // Simple header — back button only
  header: {
    backgroundColor: '#1a2a6c',
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 56 : (StatusBar.currentHeight ?? 0) + 12,
  },
  backBtn: { alignSelf: 'flex-start', padding: 4 },
  backText: { fontSize: 14, color: '#ffffff', fontWeight: '600' },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },

  // Title row
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a2a6c',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 12,
    color: '#7a8ab0',
    maxWidth: 200,
    lineHeight: 17,
  },

  // Filter cards
  filterSection: { gap: 10 },
  filterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  filterCardUrgent:  { borderColor: '#f5c6c6' },
  filterCardWarning: { borderColor: '#f5e6b2' },
  filterCardInfo:    { borderColor: '#c5d8fa' },
  filterCardRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconText: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  filterLabel: { fontSize: 14, fontWeight: '600', color: '#2a3a6c' },
  filterCount: { fontSize: 22, fontWeight: '800' },

  // All notifications
  allNotifsSection: { gap: 12 },
  allNotifsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allNotifsTitle: { fontSize: 15, fontWeight: '700', color: '#1a2a6c' },

  // Empty state
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a2a6c',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#7a8ab0',
    textAlign: 'center',
    lineHeight: 18,
  },
});