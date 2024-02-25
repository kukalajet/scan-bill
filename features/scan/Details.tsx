import { FlatList } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { BillListItem } from './BillListItem';

import { Divider } from '@/components/divider';
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
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        style={styles.list}
      />
    </Animated.View>
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
}));

export { Details };
