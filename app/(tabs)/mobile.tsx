import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { ThemedView, ThemedText, ThemedFlatList } from '@/components/themed';
import ThemedLayout from '@/components/layouts/ThemedLayout';
import { sendSms } from '@/utils/mobile';
import { Plan } from '@/constants/definitions';
import { useTranslation } from 'react-i18next';
import MobileIcon from '@/components/icons/MobileIcon';
import { humanize_data } from '@/utils/actions';

type PlanItemProps = {
  item: Plan;
  onPress: (code: string) => void;
};

const PlanItem: React.FC<PlanItemProps> = React.memo(({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(item.code);
  }, [item.code, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView style={styles.planItemContainer}>
        <ThemedView>
          <MobileIcon size={32} />
        </ThemedView>
        <ThemedView style={styles.planItemTextContainer}>
          <ThemedText type='subtitle'>{`${item.data} - ${item.duration}`}</ThemedText>
          <ThemedText type='defaultSemiBold'>{`${item.price} SRD`}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
});

export default function MobileScreen() {
  const { t } = useTranslation();

  const dataPlans: Plan[] = useMemo(() => [
    { id: 1, duration: `12 ${t('hours')}`, data: 150, price: 23, code: 'NET 12' },
    { id: 2, duration: `1 ${t('day')}`, data: 2560, price: 44, code: 'NET 1D' },
    { id: 3, duration: `3 ${t('days')}`, data: 4608, price: 87, code: 'NET 3D' },
    { id: 4, duration: `7 ${t('days')}`, data: 10752, price: 218, code: 'NET 7D' },
    { id: 5, duration: `30 ${t('days')}`, data: 25600, price: 870, code: 'NET 30D' },
  ], [t]);

  const onPress = useCallback((code: string) => {
    sendSms('4040', code);
  }, []);

  const data = useMemo(() => dataPlans.map((plan) => ({ 
    ...plan, 
    data: humanize_data(plan.data) 
  })), [dataPlans]);

  const renderItem: ListRenderItem<Plan> = useCallback(({ item }) => (
    <PlanItem item={item} onPress={onPress} />
  ), [onPress]);

  return (
    <ThemedLayout
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('mobile.title')}</ThemedText>
        <ThemedView style={styles.list}>
          <ThemedFlatList 
            data={data} 
            renderItem={renderItem} 
            keyExtractor={(item) => item.id.toString()}
          />
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
  list: {
    width: '100%',
    marginTop: 16,
  },
  planItemContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12
  },
  planItemTextContainer: {
    flexDirection: 'column'
  },
});
