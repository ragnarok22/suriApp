import { useThemeColor } from '@/hooks/useThemeColor';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';

interface ModalBottomProps {
  content: React.ReactNode;
  snapPoints?: (string | number)[];
}

type Ref = BottomSheet | null;

const ModalBottom = forwardRef<Ref, ModalBottomProps>((props, ref) => {
  const backgroundColor = useThemeColor({}, 'background');

  let snapPoints = props.snapPoints;
  if (!props.snapPoints) {
    snapPoints = useMemo(() => ['50%', '100%'], []);
  }

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      style={[styles.container, { backgroundColor: 'transparent' }]}
      backgroundStyle={{ backgroundColor }}
      enablePanDownToClose
    >
      <BottomSheetView style={[styles.contentContainer]}>
        {props.content}
      </BottomSheetView>
    </BottomSheet>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ModalBottom;
