import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useTruck } from '../context/TruckContext';
import Header from '../components/Header';

const cameraIcon = require('../images/camera.png');

const MAINTENANCE_ITEMS = [
  { id: 1, name: 'Engine Oil & Filter Replacement', intervalKm: 5000, lastServiceKm: 13000 },
  { id: 2, name: 'Fuel Filter Replacement', intervalKm: 10000, lastServiceKm: 10000 },
  { id: 3, name: 'Brake Fluid Change', intervalKm: 20000, lastServiceKm: 5000 },
  { id: 4, name: 'Chassis & Suspension Grease Service', intervalKm: 8000, lastServiceKm: 12000 },
  { id: 5, name: 'Battery and Electrical', intervalKm: 15000, lastServiceKm: 8000 },
  { id: 6, name: 'Tire Pressure & Condition', intervalKm: 3000, lastServiceKm: 16000 },
];

function getStatus(kmRemaining: number) {
  if (kmRemaining <= 0) return 'Overdue';
  if (kmRemaining <= 500) return 'Warning';
  return 'Good';
}

function getStatusColors(status: string) {
  if (status === 'Good') return { bg: '#2e7d32', text: '#ffffff' };
  if (status === 'Warning') return { bg: '#e07b00', text: '#ffffff' };
  return { bg: '#c62828', text: '#ffffff' };
}

const TMaintenance = ({ navigation, route }: any) => {
  const plateNumber = route?.params?.plateNumber ?? 'UNKNOWN';
  const truck = useTruck();
  const currentKm = truck ? truck.currentKm : 0;

  const [proofModalVisible, setProofModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [proofImage, setProofImage] = useState<string | null>(null);

  useEffect(function() {
    (async function() {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (camera.status !== 'granted' || gallery.status !== 'granted') {
        Alert.alert('Permission Required', 'Camera and gallery permissions are needed.');
      }
    })();
  }, []);

  function getKmRemaining(item: any) {
    return item.intervalKm - (currentKm - item.lastServiceKm);
  }

  function handleCheckPress(item: any) {
    setSelectedItem(item);
    setProofImage(null);
    setProofModalVisible(true);
  }

  async function handlePickImage(useCamera: boolean) {
    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
          });
      if (!result.canceled) {
        setProofImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not open camera or gallery.');
    }
  }

  function handlePickSource() {
    Alert.alert(
      'Upload Proof Photo',
      'Choose source',
      [
        { text: 'Camera', onPress: function() { handlePickImage(true); } },
        { text: 'Gallery', onPress: function() { handlePickImage(false); } },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  function handleProofSubmit() {
    if (!proofImage) {
      Alert.alert('No Photo', 'Please attach a photo proof before submitting.');
      return;
    }
    Alert.alert('Success', 'Proof submitted for ' + selectedItem?.name, [
      { text: 'OK', onPress: function() { setProofModalVisible(false); setProofImage(null); } }
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2a6c" />

      <Header navigation={navigation} showBack={true} />

      <View style={styles.titleCard}>
        <Text style={styles.plateLabel}>
          PLATE NUMBER:
          <Text style={styles.plateValue}>{'   ' + plateNumber}</Text>
        </Text>
        <Text style={styles.screenTitle}>Truck Maintenance Log</Text>
        <Text style={styles.kmReading}>
          {currentKm > 0 ? currentKm.toLocaleString() + ' KM  •  Current Reading' : 'No odometer reading yet'}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentKm === 0 ? (
          <View style={styles.noKmCard}>
            <Text style={styles.noKmIcon}>🚛</Text>
            <Text style={styles.noKmText}>No odometer reading found</Text>
            <Text style={styles.noKmSub}>Please submit your current KM in the Truck Odometer screen first.</Text>
            <TouchableOpacity
              style={styles.goToOdometerBtn}
              onPress={function() { navigation.navigate('tOdometer', { plateNumber }); }}
              activeOpacity={0.8}
            >
              <Text style={styles.goToOdometerText}>Go to Odometer →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tableCard}>
            <Text style={styles.tableTitle}>
              {'All Maintenance Records (' + MAINTENANCE_ITEMS.length + ')'}
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderLeft}>Maintenance Type</Text>
              <Text style={styles.tableHeaderRight}>Status</Text>
            </View>
            <View style={styles.tableDivider} />

            {MAINTENANCE_ITEMS.map(function(item, index) {
              const kmRemaining = getKmRemaining(item);
              const status = getStatus(kmRemaining);
              const colors = getStatusColors(status);
              const isOverdue = status === 'Overdue';

              return (
                <View key={item.id}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableItemName}>{item.name}</Text>
                    <View style={styles.statusCell}>
                      <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                        <Text style={[styles.statusText, { color: colors.text }]}>{status}</Text>
                      </View>
                      {isOverdue && (
                        <View style={styles.actionBtns}>
                          <TouchableOpacity style={styles.checkBtn} onPress={function() { handleCheckPress(item); }}>
                            <Text style={styles.checkBtnText}>✓</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.xBtn}>
                            <Text style={styles.xBtnText}>✕</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                  {index < MAINTENANCE_ITEMS.length - 1 && <View style={styles.rowDivider} />}
                </View>
              );
            })}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal
        visible={proofModalVisible}
        transparent
        animationType="slide"
        onRequestClose={function() { setProofModalVisible(false); }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Submit Proof of Repair</Text>
            <Text style={styles.modalSubtitle}>{selectedItem?.name}</Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalInstruction}>
              Please attach a photo as proof that this maintenance has been completed.
            </Text>

            <TouchableOpacity
              style={[styles.proofPlaceholder, proofImage ? styles.proofPlaceholderDone : null]}
              onPress={handlePickSource}
              activeOpacity={0.75}
            >
              {proofImage ? (
                <Image source={{ uri: proofImage }} style={styles.proofPreview} resizeMode="cover" />
              ) : (
                <View style={styles.proofInner}>
                  <Image source={cameraIcon} style={styles.proofCameraIcon} resizeMode="contain" />
                  <Text style={styles.proofPlaceholderText}>Tap to add photo</Text>
                  <Text style={styles.proofPlaceholderSub}>Camera or Gallery</Text>
                </View>
              )}
              {proofImage && (
                <View style={styles.uploadDoneBadge}>
                  <Text style={styles.uploadDoneText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={function() { setProofModalVisible(false); }}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSubmitBtn} onPress={handleProofSubmit} activeOpacity={0.8}>
                <Text style={styles.modalSubmitText}>Submit Proof</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default TMaintenance;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a2a6c' },
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
    marginBottom: 4,
  },
  kmReading: { fontSize: 11, color: '#c9a84c', fontWeight: '600', letterSpacing: 0.5 },
  scrollView: { flex: 1, backgroundColor: '#e8edf5' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  noKmCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noKmIcon: { fontSize: 48, marginBottom: 12 },
  noKmText: { fontSize: 16, fontWeight: '800', color: '#1a2a6c', marginBottom: 8 },
  noKmSub: { fontSize: 13, color: '#5a6a8c', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  goToOdometerBtn: {
    backgroundColor: '#1a2a6c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  goToOdometerText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tableTitle: { fontSize: 14, fontWeight: '800', color: '#1a2a6c', marginBottom: 12 },
  tableHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  tableHeaderLeft: { fontSize: 11, fontWeight: '700', color: '#1a2a6c' },
  tableHeaderRight: { fontSize: 11, fontWeight: '700', color: '#1a2a6c' },
  tableDivider: { height: 1.5, backgroundColor: '#e0e5f0', marginBottom: 8 },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  tableItemName: { flex: 1, fontSize: 12, color: '#2a3a6c', fontWeight: '500', paddingRight: 8 },
  statusCell: { alignItems: 'flex-end', gap: 4 },
  statusBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 6, minWidth: 70, alignItems: 'center' },
  statusText: { fontSize: 12, fontWeight: '700' },
  actionBtns: { flexDirection: 'row', gap: 6, marginTop: 4 },
  checkBtn: {
    backgroundColor: '#2e7d32', width: 28, height: 28,
    borderRadius: 6, alignItems: 'center', justifyContent: 'center',
  },
  checkBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  xBtn: {
    backgroundColor: '#c62828', width: 28, height: 28,
    borderRadius: 6, alignItems: 'center', justifyContent: 'center',
  },
  xBtnText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  rowDivider: { height: 1, backgroundColor: '#f0f3f8' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: { fontSize: 18, fontWeight: '900', color: '#1a2a6c', marginBottom: 4 },
  modalSubtitle: { fontSize: 13, color: '#5a6a8c', fontWeight: '500', marginBottom: 12 },
  modalDivider: { height: 1.5, backgroundColor: '#e0e5f0', marginBottom: 14 },
  modalInstruction: { fontSize: 13, color: '#3a4a6c', marginBottom: 16, lineHeight: 20 },
  proofPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f3f8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#d0d8e8',
    overflow: 'hidden',
  },
  proofPlaceholderDone: { borderColor: '#2e7d32', borderWidth: 2 },
  proofInner: { alignItems: 'center' },
  proofCameraIcon: {
    width: 40,
    height: 40,
    tintColor: '#5a6a8c',
    marginBottom: 8,
  },
  proofPlaceholderText: { fontSize: 14, color: '#5a6a8c', fontWeight: '600' },
  proofPlaceholderSub: { fontSize: 11, color: '#8a9abc', marginTop: 2 },
  proofPreview: { width: '100%', height: '100%' },
  uploadDoneBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#2e7d32', width: 26, height: 26,
    borderRadius: 13, alignItems: 'center', justifyContent: 'center',
  },
  uploadDoneText: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  modalBtnRow: { flexDirection: 'row', gap: 12 },
  modalCancelBtn: {
    flex: 1, borderWidth: 2, borderColor: '#1a2a6c',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  modalCancelText: { color: '#1a2a6c', fontSize: 14, fontWeight: '700' },
  modalSubmitBtn: {
    flex: 1, backgroundColor: '#c9a84c',
    borderRadius: 10, paddingVertical: 12, alignItems: 'center',
  },
  modalSubmitText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
});