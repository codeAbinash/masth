import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { Button } from '@components/Button'
import Loading from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import Tabs from '@components/Tabs'
import { get_referred_members_f, profile_f } from '@query/api'
import Clipboard from '@react-native-community/clipboard'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import { shareText } from '@utils/utils'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Feather'
import Miner from './Miner'

export default function Refer({ navigation }: { navigation: StackNav }) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['referredUsers'],
    queryFn: get_referred_members_f,
    getNextPageParam: (lastPage, _pages) => {
      return lastPage.list.next_page_url
    },
    initialPageParam: null,
  })

  const loadNext = () => {
    fetchNextPage()
  }

  if (isLoading)
    return (
      <View className='flex-1 bg-bgSecondary'>
        <BackHeader navigation={navigation} title='Refer' RightComponent={<RightSettingIcon navigation={navigation} />} />
        <View className='flex-1 px-5'>
          <Loading />
        </View>
      </View>
    )

  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='Refer' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <View>
        <FlatList
          contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
          data={data?.pages.map((page) => page.list.data).flat()}
          renderItem={({ item }) => <Miner {...item.profile[0]} />}
          keyExtractor={(item) => item.user_id}
          onEndReached={loadNext}
          onEndReachedThreshold={0.2}
          ListHeaderComponent={
            <View className='pb-1'>
              <TotalEarned earned={data?.pages.at(-1)?.coins_earned || 0} />
              <ReferCard percentage={data?.pages.at(-1)?.referred_bonus || '0'} />
              <Tabs
                tabs={[
                  {
                    title: 'Active Miners',
                    UI: null,
                  },
                  {
                    title: 'Inactive Miners',
                    UI: null,
                    disabled: true,
                  },
                ]}
              />
              {!data?.pages.at(-1)?.list.data.length && (
                <View className='flex-1 items-center justify-center py-24'>
                  <Text className='text-center text-neutral-600'>No Active Miners</Text>
                </View>
              )}
            </View>
          }
          ListFooterComponent={
            <View className='pb-32'>
              <PaddingBottom />
            </View>
          }
        />
      </View>
    </View>
  )
}

function ReferCard({ percentage }: { percentage: string }) {
  const referText =
    'Refer a friend and earn 10% commission on every mining they do. Share your referral code with your friends and family and earn more.'
  return (
    <View className='mt-5 rounded-3xl bg-white p-5'>
      <View>
        <Text className='text-lg'>Get {percentage}% Commission</Text>
        <Text className='text-base text-neutral-600'>Every time when your friend started mining</Text>
      </View>
      <ReferCode />
      <Button
        title='Refer'
        className='mt-4'
        LeftUI={<Icon name='share-2' size={16} color='white' />}
        onPress={() => shareText(referText)}
        style={{ padding: 13 }}
      />
    </View>
  )
}

function ReferCode() {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })
  const [copied, setCopied] = useState(false)
  const onPress = () => {
    Clipboard.setString(profileQuery.data?.data.refer_code || '')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <View className='mt-4 flex-row items-center justify-between rounded-xl bg-bgSecondary p-3.5 pl-4'>
      <View className='flex-row'>
        <View className='flex-row'>
          <Text className='text-base'>Refer Code: </Text>
        </View>
        <View>
          <Text className='text-base text-accent'>{profileQuery.data?.data.refer_code || 'Loading...'}</Text>
        </View>
      </View>
      <TouchableOpacity className='pr-1' onPress={onPress}>
        {copied ? <Icon name='check' size={18} color={colors.greenPrimary} /> : <Icon name='copy' size={18} />}
      </TouchableOpacity>
    </View>
  )
}
function TotalEarned({ earned = 0 }: { earned?: number }) {
  return (
    <View className='mt-5 items-center justify-center' style={{ gap: 10 }}>
      <Text className='text-xl text-neutral-600'>You've Earned</Text>
      <View className='flex-row items-end gap-x-1'>
        <Text style={{ fontSize: 40 }}>{earned}</Text>
        <Text style={{ fontSize: 25 }} className='pb-1 text-neutral-600'>
          MST
        </Text>
      </View>
    </View>
  )
}
