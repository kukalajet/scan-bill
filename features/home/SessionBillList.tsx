import { FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { SessionBillListItem } from './SessionBillListItem';

import { Divider } from '@/components/divider';
import { useBillingSessionsStore } from '@/stores/bill-sessions';

const SessionBillList: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const sessions = useBillingSessionsStore((state) => state.sessions);

  return (
    <FlatList
      data={sessions}
      renderItem={({ item, index }) => (
        <SessionBillListItem item={item} index={index} />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      style={styles.list}
    />
  );
};

const stylesheet = createStyleSheet(({ space }) => ({
  list: {
    width: '100%',
  },
  divider: {
    marginHorizontal: space[400],
  },
}));

export { SessionBillList };
