import { colors } from '@utils/colors'
import { StatusBar } from 'react-native'

export function TransparentStatusBar() {
  return <StatusBar barStyle={'default'} backgroundColor={'transparent'} />
}

export function SecondaryBgStatusBar() {
  return <StatusBar barStyle={'dark-content'} backgroundColor={colors.bgSecondary} />
}
