import BottomSheet from '@gorhom/bottom-sheet';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import { Details } from './Details';
import { Overview } from './Overview';

import { useBillingSessionStore } from '@/stores/bill-session';

const ScanScreen: React.FC<unknown> = () => {
  const [isFullScreen, setFullScreen] = useState(false);
  const totalBills = useBillingSessionStore((state) => state.bills.length);
  const clearBillingSession = useBillingSessionStore((state) => state.clear);
  const addBillFromUrl = useBillingSessionStore(
    (state) => state.addBillFromUrl,
  );

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => {
    if (totalBills === 0) return [168];
    return [168, '80%'];
  }, [totalBills]);
  const handleSheetChanges = useCallback((index: number) => {
    if (index === 1) {
      setFullScreen(true);
    } else {
      setFullScreen(false);
    }
  }, []);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      const value = codes[0].value;
      if (value) addBillFromUrl(value);
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    return () => clearBillingSession();
  }, []);

  useEffect(() => {
    if (totalBills === 0) {
      bottomSheetRef.current?.snapToIndex(0);
    }
  }, [totalBills]);

  if (device == null) return <View />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          {!isFullScreen && <Overview />}
          {isFullScreen && <Details />}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
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
