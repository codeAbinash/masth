import Gradient from '@components/Gradient'
import { PaddingBottom } from '@components/SafePadding'
import MasthGames from '@icons/MasthGames.svg'
import SendIcon from '@icons/sendIcon.svg'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import type { TouchableOpacityProps } from 'react-native-gesture-handler'
import { Bold, Medium, Pumpkin, SemiBold } from './fonts'

export default function Claim() {
  return (
    <View className='flex-1 justify-between px-5'>
      <View>
        <MasthGames className='mx-auto mt-10' height={150} width={150} />
        <Image source={{ uri: 'https://wallpaperaccess.com/full/306739.jpg' }} className='aspect-video w-full rounded-2xl' />
        <Pumpkin className='mt-10 text-center text-4xl text-amber-500'>Earned</Pumpkin>
        <SemiBold className='mt-2 text-center text-4xl text-black'>20 MST</SemiBold>
      </View>
      <View className='mt-5'>
        <View className='flex-row justify-between'>
          <Medium className='text-lg text-black'>Claimed</Medium>
          <Bold className='text-lg text-black'>20 MST</Bold>
        </View>
        <View className='flex-row justify-between'>
          <Medium className='text-lg text-black'>Boost Level</Medium>
          <Bold className='text-lg text-black'>2X</Bold>
        </View>
        <View className='flex-row justify-between'>
          <Medium className='text-lg text-black'>Global Ranking</Medium>
          <Bold className='text-lg text-amber-500'>#19</Bold>
        </View>
        <View className='flex-row justify-between'>
          <Medium className='text-lg text-black'>Coin/Minutes</Medium>
          <Bold className='text-lg text-amber-500'>2 MST</Bold>
        </View>
      </View>
      <View className='mt-5 flex-row pb-10' style={{ gap: 10 }}>
        <GradientButton className='flex-1'>
          <Pumpkin className='text-center text-3xl text-white' style={styles.fontOutline}>
            Claim
          </Pumpkin>
        </GradientButton>
        <GradientButton>
          <SendIcon className='px-7' height={30} width={30} />
        </GradientButton>
        <PaddingBottom />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fontOutline: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
})

type GradientButtonProps = TouchableOpacityProps

function GradientButton({ children, ...props }: GradientButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      <Gradient className='items-center justify-center rounded-xl border py-3.5'>{children}</Gradient>
    </TouchableOpacity>
  )
}
