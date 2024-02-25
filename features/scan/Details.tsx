import { FlatList } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { BillListItem } from './BillListItem';

import { useBillingSessionStore } from '@/stores/bill-session';

const Details: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const bills = useBillingSessionStore((state) => state.bills);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <FlatList
        data={bills}
        renderItem={({ item, index }) => (
          <BillListItem bill={item} index={index} />
        )}
        keyExtractor={(item) => item.origin}
        style={styles.list}
      />
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(({ color }) => ({
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
}));

export { Details };
