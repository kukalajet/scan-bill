import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { BillListItem } from './BillListItem';
import { DetailsSaveButton } from './DetailsSaveButton';

import { Divider } from '@/components/divider';
import { useBillingSessionStore } from '@/stores/bill-session';

const AnimatedBottomSheetFlatList =
  Animated.createAnimatedComponent(BottomSheetFlatList);

const Details: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const bills = useBillingSessionStore((state) => state.bills);
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <AnimatedBottomSheetFlatList
        data={bills}
        renderItem={({ item, index }) => (
          <BillListItem bill={item as Bill} index={index} />
        )}
        keyExtractor={(item) => (item as Bill).origin}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.list}
      />
      <DetailsSaveButton onPress={() => {}} style={styles.button(bottom)} />
    </>
  );
};

const stylesheet = createStyleSheet(({ color, space }) => ({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.bg.surface.default,
  },
  list: {
    width: '100%',
  },
  divider: {
    marginHorizontal: space[400],
  },
  button: (bottom: number) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom,
  }),
}));

export { Details };
