import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import SwapIcon from '@icons/swap.svg'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Wallet({ navigation }: { navigation: StackNav }) {
  return (
    <View style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className='p-5'>
      <PaddingTop />
      <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
      <View className='mt-3 flex-row items-center justify-between'>
        <View className='flex flex-row'>
          <Text className='text-neutral-500' style={{ fontSize: 30 }}>
            Your,{' '}
          </Text>
          <Text style={{ fontSize: 30 }}>Wallet</Text>
        </View>
        <TouchableOpacity
          className='rounded-full border border-neutral-200 bg-white p-2.5'
          onPress={() => navigation.navigate('Transactions')}
        >
          <SwapIcon height={18} width={18} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
