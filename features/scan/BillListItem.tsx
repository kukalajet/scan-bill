import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import {
  convertISO8601StringToFormattedDate,
  formatToLekCurrency,
} from '@/utils/format';

type BillListItemProps = { bill: Bill; index: number };

const BillListItem: React.FC<BillListItemProps> = ({ bill, index }) => {
  const { styles } = useStyles(stylesheet);
  const date = convertISO8601StringToFormattedDate(bill.crtd);
  const price = formatToLekCurrency(Number(bill.prc));

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>#{index + 1}</Text>
      <View style={styles.info}>
        <Text style={styles.title}>
          Bill: <Text style={styles.total}>{price}</Text>
        </Text>
        <Text style={styles.subtitle}>{date}</Text>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ color, space, text }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: space['400'],
    paddingHorizontal: space['600'],
    alignItems: 'center',
  },
  info: { paddingStart: 16 },
  icon: {
    padding: space['400'],
    borderRadius: space['300'],
    backgroundColor: color.bg.fill.magic.secondary.active,
    color: color.text.magic.secondary,
    ...text.body.lg,
  },
  title: {
    ...text.body.lg,
    color: color.text.default,
  },
  subtitle: {
    ...text.body.md,
    color: color.text.secondary,
  },
  total: {
    ...text.heading.md,
  },
}));

export { BillListItem };
