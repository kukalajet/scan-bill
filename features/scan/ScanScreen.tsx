import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import { useBillingSessionStore } from '@/stores/bill-session';

const ScanScreen: React.FC<unknown> = () => {
  const { bills, addBillFromUrl } = useBillingSessionStore();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [200, '80%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

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
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>
            {bills.map((bill) => (
              <Text>{bill.origin}</Text>
            ))}
          </Text>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export { ScanScreen };
