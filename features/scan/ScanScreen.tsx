import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

import { Overview } from './Overview';

import { useBillingSessionStore } from '@/stores/bill-session';

const ScanScreen: React.FC<unknown> = () => {
  const clearBillingSession = useBillingSessionStore((state) => state.clear);
  const addBillFromUrl = useBillingSessionStore(
    (state) => state.addBillFromUrl,
  );

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

  useEffect(() => {
    return () => clearBillingSession();
  }, []);

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
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Overview />
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
