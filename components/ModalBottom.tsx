import { useThemeColor } from "@/hooks/useThemeColor";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";

interface ModalBottomProps {
  content: React.ReactNode;
  snapPoints?: (string | number)[];
}

type Ref = BottomSheet | null;

type SnapPoints =
  | (string | number)[]
  | SharedValue<(string | number)[]>
  | undefined;

const ModalBottom = forwardRef<Ref, ModalBottomProps>((props, ref) => {
  const backgroundColor = useThemeColor({}, "background");

  const snapPoints: SnapPoints = useMemo(() => {
    if (!props.snapPoints) return ["50%", "100%"];

    return snapPoints;
  }, [props.snapPoints]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      style={[styles.container, { backgroundColor: "transparent" }]}
      backgroundStyle={{ backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: "grey" }}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={[styles.contentContainer]}>
        {props.content}
      </BottomSheetView>
    </BottomSheet>
  );
});

ModalBottom.displayName = "ModalBottom";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default ModalBottom;
