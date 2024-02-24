import { View, StyleSheet } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

const ScanScreen: React.FC<unknown> = () => {
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(codes[0].value);
    },
  });

  if (device == null) return <View />;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      codeScanner={codeScanner}
      isActive
    />
  );
};

export default ScanScreen;
