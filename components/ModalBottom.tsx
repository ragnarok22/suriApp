import { useThemeColor } from '@/hooks/useThemeColor';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

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

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      style={[styles.container, { backgroundColor: 'transparent' }]}
      backgroundStyle={{ backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: 'grey' }}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
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
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default ModalBottom;
