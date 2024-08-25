import { StackNavigationProp } from '@react-navigation/stack'
import type { RootStackParamList } from 'App'

export type StackNav = StackNavigationProp<RootStackParamList>
export type NavProp = { navigation: StackNav }

export enum AdState {
  NOT_LOADED,
  LOADED,
  FAILED,
}
