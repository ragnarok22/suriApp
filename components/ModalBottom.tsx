import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';

interface ModalBottomProps {
  children: React.ReactNode;
}

type Ref = BottomSheetModal | null;

const ModalBottom = forwardRef<Ref, ModalBottomProps>((props, ref) => {
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
    >
      <BottomSheetView style={styles.contentContainer}>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  )
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ModalBottom;
