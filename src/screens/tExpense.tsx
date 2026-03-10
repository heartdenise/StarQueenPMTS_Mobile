import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';

const cameraIcon = require('../images/camera.png');

const TExpense = ({ navigation, route }: any) => {
  const plateNumber = route?.params?.plateNumber ?? 'UNKNOWN';

  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptPhoto, setReceiptPhoto] = useState<string | null>(null);
  const [processPhoto, setProcessPhoto] = useState<string | null>(null);

  useEffect(function() {
    (async function() {
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (camera.status !== 'granted' || gallery.status !== 'granted') {
        Alert.alert('Permission Required', 'Camera and gallery permissions are needed.');
      }
    })();
  }, []);

  async function handlePickImage(type: 'receipt' | 'process', useCamera: boolean) {
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
        if (type === 'receipt') setReceiptPhoto(result.assets[0].uri);
        else setProcessPhoto(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not open camera or gallery.');
    }
  }

  function handlePickSource(type: 'receipt' | 'process') {
    Alert.alert(
      type === 'receipt' ? 'Upload Receipt' : 'Upload Process Photo',
      'Choose source',
      [
        { text: 'Camera', onPress: function() { handlePickImage(type, true); } },
        { text: 'Gallery', onPress: function() { handlePickImage(type, false); } },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  function handleSubmit() {
    if (!date || !category || !amount) {
      Alert.alert('Missing Fields', 'Please fill in Date, Category, and Amount.');
      return;
    }
    if (!receiptPhoto || !processPhoto) {
      Alert.alert('Missing Photos', 'Please upload both Receipt and Process photos.');
      return;
    }
    Alert.alert('Success', 'Expense submitted successfully!', [
      { text: 'OK', onPress: function() { navigation.goBack(); } }
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
        <Text style={styles.screenTitle}>Truck Expense</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>Date</Text>
          <TextInput
            style={styles.input}
            placeholder="--/--/----"
            placeholderTextColor="#aab0c0"
            value={date}
            onChangeText={setDate}
          />
        </View>

        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>Please Indicate Expense Category</Text>
          <TextInput
            style={styles.input}
            placeholder="eg. fuel / change oil / wheel / etc."
            placeholderTextColor="#aab0c0"
            value={category}
            onChangeText={setCategory}
          />
        </View>

        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>How much is the cost?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the Amount Here"
            placeholderTextColor="#aab0c0"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>Notes:</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            placeholder="Add note here"
            placeholderTextColor="#aab0c0"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.uploadSection}>

          {/* Receipt Photo */}
          <TouchableOpacity
            style={[styles.uploadCard, receiptPhoto ? styles.uploadCardDone : null]}
            onPress={function() { handlePickSource('receipt'); }}
            activeOpacity={0.75}
          >
            {receiptPhoto ? (
              <Image source={{ uri: receiptPhoto }} style={styles.uploadPreview} resizeMode="cover" />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Image source={cameraIcon} style={styles.uploadCameraIcon} resizeMode="contain" />
                <Text style={styles.uploadTitle}>Receipt Photo</Text>
                <Text style={styles.uploadSub}>Upload Here</Text>
              </View>
            )}
            {receiptPhoto && (
              <View style={styles.uploadDoneBadge}>
                <Text style={styles.uploadDoneText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Process Photo */}
          <TouchableOpacity
            style={[styles.uploadCard, processPhoto ? styles.uploadCardDone : null]}
            onPress={function() { handlePickSource('process'); }}
            activeOpacity={0.75}
          >
            {processPhoto ? (
              <Image source={{ uri: processPhoto }} style={styles.uploadPreview} resizeMode="cover" />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Image source={cameraIcon} style={styles.uploadCameraIcon} resizeMode="contain" />
                <Text style={styles.uploadTitle}>Process Photo</Text>
                <Text style={styles.uploadSub}>Upload Here</Text>
              </View>
            )}
            {processPhoto && (
              <View style={styles.uploadDoneBadge}>
                <Text style={styles.uploadDoneText}>✓</Text>
              </View>
            )}
          </TouchableOpacity>

        </View>

        <Text style={styles.uploadNote}>* Both Receipt and Process photos are required</Text>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TExpense;

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
  },
  scrollView: { flex: 1, backgroundColor: '#e8edf5' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  fieldCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  fieldLabel: {
    fontSize: 11,
    color: '#5a6a8c',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f3f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1a2a6c',
  },
  inputMultiline: {
    height: 80,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  uploadSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
    marginTop: 4,
  },
  uploadCard: {
    flex: 1,
    height: 130,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#1a2a6c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#d0d8e8',
  },
  uploadCardDone: {
    borderColor: '#2e7d32',
    borderWidth: 2,
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  uploadCameraIcon: {
    width: 36,
    height: 36,
    tintColor: '#1a2a6c',
    marginBottom: 6,
  },
  uploadTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a2a6c',
    textAlign: 'center',
    marginBottom: 2,
  },
  uploadSub: { fontSize: 10, color: '#8a9abc', fontWeight: '500' },
  uploadPreview: { width: '100%', height: '100%' },
  uploadDoneBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#2e7d32',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadDoneText: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
  uploadNote: {
    fontSize: 10,
    color: '#e07b00',
    fontWeight: '500',
    marginBottom: 20,
    marginLeft: 4,
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
  submitText: { color: '#ffffff', fontSize: 16, fontWeight: '800', letterSpacing: 1.5 },
});