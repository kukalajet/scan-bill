import { View, StyleSheet, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import { useBillingSessionStore } from '@/stores/bill-session';

const ScanScreen: React.FC<unknown> = () => {
  const { bills, addBillFromUrl } = useBillingSessionStore();

  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      const value = codes[0].value;
      if (value) addBillFromUrl(value);
    },
  });

  if (device == null) return <View />;

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        codeScanner={codeScanner}
        isActive
      />
      <View style={{ position: 'absolute', top: 16, left: 16, right: 16 }}>
        <Text style={{ color: 'white' }}>{bills.length} bills added</Text>
        {bills.map((bill) => (
          <Text key={bill.origin} style={{ color: 'white' }}>
            {bill.origin}
          </Text>
        ))}
      </View>
    </>
  );
};

export default ScanScreen;
