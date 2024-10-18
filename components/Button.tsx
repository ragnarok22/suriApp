import { StyleSheet, Pressable, PressableProps, useColorScheme } from "react-native"

type ButtonProps = PressableProps & {
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button(props: ButtonProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const btnBackground = colorScheme === 'dark' ? '#1D3D47' : 'transparent';
  const btnColor = colorScheme === 'dark' ? 'white' : '#1D3D47';

  const variant: Record<string, { backgroundColor: string, color: string }> = {
    primary: {
      backgroundColor: '#1D3D47',
      color: 'white',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#1D3D47',
    },
    danger: {
      backgroundColor: 'red',
      color: 'white',
    },
  }

  const btnStyles = [
    styles.button,
    {
      backgroundColor: variant[props.variant ?? 'primary'].backgroundColor,
      color: variant[props.variant ?? 'primary'].color,
    },
    props.style,
  ]

  return (
    <Pressable style={btnStyles} {...props}>
      {props.children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flexShrink: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#1D3D47',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
})
