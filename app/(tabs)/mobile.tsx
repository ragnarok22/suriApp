import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedView, ThemedText, ThemedFlatList } from '@/components/themed';
import ThemedLayout from '@/components/layouts/ThemedLayout';
import { sendSms } from '@/utils/mobile';
import { useMemo } from 'react';
import { Plan } from '@/constants/definitions';
import { useTranslation } from 'react-i18next';
import MobileIcon from '@/components/icons/MobileIcon';
import { humanize_data } from '@/utils/actions';

type PlanItemProps = {
  item: Plan
  onPress?: (code: string) => void
}

const PlanItem = ({ item, onPress }: PlanItemProps) => {
  const emptyFunction = () => { }

  const handlePress = () => {
    if (onPress) {
      onPress(item.code)
    }
  }

  return (
    <TouchableOpacity onPress={handlePress || emptyFunction}>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <ThemedView>
          <MobileIcon size={32} />
        </ThemedView>
        <ThemedView style={{ flexDirection: 'column' }}>
          <ThemedText type='subtitle'>{item.data} - {item.duration}</ThemedText>
          <ThemedText type='defaultSemiBold'>{item.price} SRD</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  )
}

export default function MobileScreen() {
  const { t } = useTranslation();

  const dataPlans: Plan[] = useMemo(() => [{
    id: 1,
    duration: '12 ' + t('hours'),
    data: 150,
    price: 23,
    code: 'NET 12',
  }, {
    id: 2,
    duration: '1 ' + t('day'),
    data: 2560,
    price: 44,
    code: 'NET 1D',
  }, {
    id: 3,
    duration: '3 ' + t('days'),
    data: 4608,
    price: 87,
    code: 'NET 3D',
  }, {
    id: 4,
    duration: '7 ' + t('days'),
    data: 10752,
    price: 218,
    code: 'NET 7D',
  }, {
    id: 5,
    duration: '30 ' + t('days'),
    data: 25600,
    price: 870,
    code: 'NET 30D',
  }], [t]);

  const onPress = (code: string) => {
    sendSms('4040', code);
  }

  const data = dataPlans.map((plan) => ({ ...plan, duration: humanize_data(plan.data) }));

  return (
    <ThemedLayout
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('mobile.title')}</ThemedText>
        <ThemedView style={styles.list}>
          <ThemedFlatList data={data} renderItem={PlanItem} style={{ width: '100%' }} onPress={onPress} />
        </ThemedView>
      </ThemedView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    color: 'white',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  list: {
    width: '100%',
    marginTop: 16,
  },
});
