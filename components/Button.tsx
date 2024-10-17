import { StyleSheet, Pressable, PressableProps } from "react-native"

export default function Button(props: PressableProps) {
  return (
    <Pressable style={styles.button} {...props}>
      {props.children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
})
