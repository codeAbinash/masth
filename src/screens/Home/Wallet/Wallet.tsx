import { SmallButton } from '@components/Button'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import Tabs from '@components/Tabs'
import LockIcon from '@icons/lock.svg'
import SwapIcon from '@icons/swap.svg'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Receive from './Receive'
import Send from './Send'
import useHybridData from '@/hooks/useHybridData'
import { profile_f, type ProfileT } from '@query/api'
import { useQuery } from '@tanstack/react-query'

export default function Wallet({ navigation }: { navigation: StackNav }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })
  const profile = useHybridData<ProfileT>(profileQuery, 'profile')
  return (
    <KeyboardAvoidingContainer style={{ backgroundColor: colors.bgSecondary }}>
      <ScrollView className='p-5 pb-10'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
        <View className='mt-3 flex-row items-center justify-between'>
          <View className='flex flex-row'>
            <Text className='text-neutral-500' style={{ fontSize: 27 }}>
              Your,{' '}
            </Text>
            <Text style={{ fontSize: 30 }}>Wallet</Text>
          </View>
          <TouchableOpacity
            className='rounded-full border border-neutral-200 bg-white p-2.5'
            onPress={() => {
              // navigation.navigate('Transactions')
            }}
          >
            <SwapIcon height={17} width={17} />
          </TouchableOpacity>
        </View>
        <View>
          <WalletBalance balance={Number(profile?.data.coin || 0)} />
        </View>
        <Tabs
          tabs={[
            { title: 'Send', UI: <Send /> },
            { title: 'Receive', UI: <Receive /> },
          ]}
        />
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}

function WalletBalance({ balance }: { balance: number }) {
  return (
    <View className='mt-4 rounded-3xl bg-yellowPrimary p-5'>
      <Text className='text-base text-onYellow'>Wallet Balance</Text>
      <View className='flex-row items-end'>
        <Text className='text-onYellow' style={{ fontSize: 40 }}>
          {balance.toFixed(4)}
        </Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.5 }}>
          <SmallButton title='Withdraw' LeftUI={<LockIcon height={16} width={16} />} />
        </View>
        <Text style={{ flex: 0.5, fontSize: 15 }} className='text-onYellow'>
          MST / USD 0.99
        </Text>
      </View>
    </View>
  )
}
