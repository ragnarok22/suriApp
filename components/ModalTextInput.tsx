import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { BottomSheetTextInputProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput"
import { Platform, TextInput } from "react-native"

type ModalTextInputProps = BottomSheetTextInputProps & {}

export default function ModalTextInput(props: ModalTextInputProps) {
  if (Platform.OS === "ios") {
    return (
      <BottomSheetTextInput
        {...props}
      />
    )
  }

  return (
    <TextInput
      {...props}
    />
  )
}
