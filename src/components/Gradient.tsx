import { colors } from '@utils/colors'
import LinearGradient, { type LinearGradientProps } from 'react-native-linear-gradient'

type CustomLinearGradientProps = Omit<LinearGradientProps, 'colors'> & {
  grad?: Array<string>
  darkColors?: Array<string>
}
export default function Gradient({ children, grad, ...props }: CustomLinearGradientProps) {
  return (
    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }} colors={grad || [colors.btnGrad1, colors.btnGrad2]} {...props}>
      {children}
    </LinearGradient>
  )
}

export function LRGradient({ children, grad, ...props }: CustomLinearGradientProps) {
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={grad ? [grad[1], grad[0]] : [colors.btnGrad1, colors.btnGrad2]} {...props}>
      {children}
    </LinearGradient>
  )
}
