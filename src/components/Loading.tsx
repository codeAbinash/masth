import { View, Text, Image, ImageProps, ImageSourcePropType } from 'react-native'
import React from 'react'
import icons from '@assets/icons/icons'
import { PaddingBottom } from './SafePadding'

interface LoadingProps extends Omit<ImageProps, 'source'> {
  size?: number
  source?: ImageSourcePropType
}

export default function Loading({ size = 50, style, source = icons.loadingGif }: LoadingProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 50 }}>
      <Image source={source} style={[{ width: size, height: size }, style]} />
      <PaddingBottom />
    </View>
  )
}
