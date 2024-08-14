import React from 'react'
import { Text, type TextProps } from 'react-native'

export const RegularS = {
  fontFamily: 'Montserrat-Regular',
}
export const MediumS = {
  fontFamily: 'Montserrat-Medium',
}
export const SemiBoldS = {
  fontFamily: 'Montserrat-SemiBold',
}
export const BoldS = {
  fontFamily: 'Montserrat-Bold',
}
export const LightS = {
  fontFamily: 'Montserrat-Light',
}

export function Medium({ children, style, ...props }: TextProps) {
  return (
    <Text style={[MediumS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Regular({ children, style, ...props }: TextProps) {
  return (
    <Text style={[RegularS, style]} {...props}>
      {children}
    </Text>
  )
}

export function SemiBold({ children, style, ...props }: TextProps) {
  return (
    <Text style={[SemiBoldS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Bold({ children, style, ...props }: TextProps) {
  return (
    <Text style={[BoldS, style]} {...props}>
      {children}
    </Text>
  )
}

export function Light({ children, style, ...props }: TextProps) {
  return (
    <Text style={[LightS, style]} {...props}>
      {children}
    </Text>
  )
}
