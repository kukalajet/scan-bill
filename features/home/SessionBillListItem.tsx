import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Bill } from '@/assets/icons';

type SessionBillListItemProps = {
  item: BillingSession;
  index: number;
};

const SessionBillListItem: React.FC<SessionBillListItemProps> = ({
  item,
  index,
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.icon(index)}>
        <Bill height={28} width={28} />
      </View>
      <Text style={styles.title}>
        Bill Total: <Text style={styles.total}>{item.total}</Text>
      </Text>
    </View>
  );
};

const stylesheet = createStyleSheet(({ color, space, text }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: space['400'],
    paddingHorizontal: space['400'],
    alignItems: 'center',
    gap: space['400'],
  },
  icon: (index: number) => ({
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: space['300'],
    backgroundColor: index % 2 ? color.icon.info : color.icon.magic,
  }),
  title: {
    ...text.body.lg,
    color: color.text.default,
  },
  total: {
    ...text.heading.md,
  },
}));

export { SessionBillListItem };
