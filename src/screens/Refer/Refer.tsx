import Images from '@assets/images/images'
import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { Button, ClaimRoundButton } from '@components/Button'
import Loading from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import { FixedTab } from '@components/Tabs'
import {
  claim_refer_task_f,
  get_referred_active_members_f,
  get_referred_inactive_members_f,
  get_referred_stats_f,
  profile_f,
  type ProfileT,
  type ReferStatsT,
} from '@query/api'
import Clipboard from '@react-native-community/clipboard'
import InterstitialAd from '@screens/Ads/InterstitialAd'
import { useInfiniteQuery, useMutation, useQuery, type UseQueryResult } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { PLAY_STORE_LINK } from '@utils/constants'
import { StackNav } from '@utils/types'
import { print, shareText } from '@utils/utils'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Miner from './Miner'

function Load() {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <View className='flex-1 px-5'>
        <Loading />
      </View>
    </View>
  )
}

export default function Refer({ navigation }: { navigation: StackNav }) {
  const [activeTab, setActiveTab] = useState(0)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ReferredStats'],
    queryFn: () => get_referred_stats_f(),
  })

  useEffect(() => {
    if (data) {
      print(data)
    }
  }, [data])

  if (isLoading || !data) return <Load />

  return (
    <>
      {!__DEV__ && <InterstitialAd />}
      <View className='flex-1 bg-bgSecondary'>
        <BackHeader navigation={navigation} title='Refer' RightComponent={<RightSettingIcon navigation={navigation} />} />
        <View className={`${activeTab === 0 ? 'flex' : 'hidden'} h-screen`}>
          <ActiveMiner refer={data} setActiveTab={setActiveTab} />
        </View>
        <View className={`${activeTab === 1 ? 'flex' : 'hidden'} h-screen`}>
          <InactiveMiner refer={data} setActiveTab={setActiveTab} />
        </View>
        <View className='pb-32'>
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}

/* {!data?.pages.at(-1)?.list?.data.length && (
<View className='flex-1 items-center justify-center py-24'>
<Text className='text-center text-neutral-600'>No Miners</Text>
</View>
)} */

function ActiveMiner({ refer, setActiveTab }: { refer: ReferStatsT; setActiveTab: (index: number) => void }) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['referredActiveUsers'],
    queryFn: get_referred_active_members_f,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage?.activeUsers?.next_page_url === null) return undefined
      return lastPage.activeUsers.current_page + 1
    },
    initialPageParam: 1,
  })

  const loadNext = () => {
    if (data?.pages.at(-1)?.activeUsers?.next_page_url === null) return
    fetchNextPage()
  }

  if (isLoading) return <Load />

  return (
    <View className='mt-5'>
      <FlatList
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20, paddingBottom: 150 }}
        data={data?.pages.map((page) => page.activeUsers.data || []).flat()}
        renderItem={({ item }) => <Miner name={item.name} username={item.username} profile_pic={item.profile_pic} />}
        keyExtractor={(item) => item.username}
        onEndReached={loadNext}
        onEndReachedThreshold={0.3}
        ListHeaderComponent={<HeaderArea data={refer} setActiveTab={setActiveTab} active={0} />}
        ListEmptyComponent={<NoMiner />}
      />
    </View>
  )
}

function NoMiner() {
  return (
    <View className='flex-1 items-center justify-center py-24'>
      <Text className='text-center text-neutral-600'>No Miners</Text>
    </View>
  )
}

function InactiveMiner({ refer, setActiveTab }: { refer: ReferStatsT; setActiveTab: (index: number) => void }) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['referredInactiveUsers'],
    queryFn: get_referred_inactive_members_f,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage?.inactiveUsers?.next_page_url === null) return undefined
      return lastPage.inactiveUsers.current_page + 1
    },
    initialPageParam: 1,
  })

  const loadNext = () => {
    if (data?.pages.at(-1)?.inactiveUsers?.next_page_url === null) return
    fetchNextPage()
  }

  if (isLoading) return <Load />

  return (
    <View className='mt-5'>
      <FlatList
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20, paddingBottom: 150 }}
        data={data?.pages.map((page) => page.inactiveUsers.data || []).flat()}
        renderItem={({ item }) => (
          <Miner
            name={item.name}
            username={item.username}
            profile_pic={item.profile_pic}
            bellIcon
            country_code={item.country_code}
            phone={item.phone_number}
            lastActive={item.last_active_time}
          />
        )}
        keyExtractor={(item) => item.username}
        onEndReached={loadNext}
        onEndReachedThreshold={0.3}
        ListHeaderComponent={<HeaderArea data={refer} setActiveTab={setActiveTab} active={1} />}
        ListEmptyComponent={<NoMiner />}
      />
    </View>
  )
}

// function get

function InviteArea({ data }: { data: ReferStatsT }) {
  // const { coins, progress, left, right } = getReferredProgress(data.totalReferred)
  const { refetch } = useQuery({
    queryKey: ['ReferredStats'],
    queryFn: () => get_referred_stats_f(),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['claimRefer'],
    mutationFn: claim_refer_task_f,
    onSuccess: (res) => {
      console.log(res)
      if (!res.status) Alert.alert('Failed', res.message)
      Alert.alert('Success', res.message)
      refetch()
    },
  })

  const upperBound = Math.floor(data.totalReferred / 5) * 5 + 5
  const referLeft = upperBound - data.totalReferred
  const percentage = (data.totalReferred / upperBound) * 100

  return (
    <View className=' mt-5 rounded-2xl bg-white p-4' style={{ gap: 15 }}>
      <View className='flex-row items-center justify-between' style={{ gap: 15 }}>
        <Image source={Images.pig} className='h-16 w-16 rounded-2xl bg-bgSecondary' />
        <View className='flex-1'>
          <Text className='text-gray-500'>Invite {referLeft} more to earn</Text>
          <Text className='text-base'>{data.totalUnclaimed + 500} MST</Text>
        </View>
        <View>
          <ClaimRoundButton title={isPending ? 'Claiming...' : 'Claim'} disabled={data.totalReferred < 5 || isPending} onPress={() => mutate()} />
        </View>
      </View>
      <View>
        <View className='overflow-hidden rounded-full bg-bgSecondary'>
          <View style={{ width: `${percentage}%` }} className='h-2 rounded-full bg-green-400' />
        </View>
        <View className='mt-1 flex-row justify-between'>
          <Text className='text-gray-500'>{data.totalReferred} Miner</Text>
          <Text className='text-gray-500'>{upperBound + ' Miners'}</Text>
        </View>
      </View>
    </View>
  )
}

function HeaderArea({ data, setActiveTab, active }: { data: ReferStatsT; setActiveTab: (index: number) => void; active: number }) {
  return (
    <View className='pb-1'>
      <TotalEarned earned={data?.coins_earned || 0} />
      <InviteArea data={data} />
      <ReferCard bonus={data?.referred_bonus || '0'} />
      <FixedTab
        activeTab={active}
        tabs={[
          {
            title: 'Active Miners',
            onPress: () => setActiveTab(0),
          },
          {
            title: 'Inactive Miners',
            onPress: () => setActiveTab(1),
          },
        ]}
      />
    </View>
  )
}

function ReferCard({ bonus }: { bonus: string }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })

  const referText = `Start Mining Masth Now! Use My Referral Code ${profileQuery.data?.data?.refer_code} For A Boosted Initial Mining Rate. Install Masth: Crypto Miner from the Play Store. 💰👇 
${PLAY_STORE_LINK}`
  return (
    <View className='mt-5 rounded-3xl bg-white p-5'>
      <View>
        <Text className='text-lg'>What You Get ?</Text>
        <Text className='text-base text-neutral-500'>
          You Will Get <Text className='text-accent'>{bonus} MST</Text> Every time When Your Referral Start Mining.
        </Text>
      </View>
      <ReferCode profileQuery={profileQuery} />
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

function ReferCode({ profileQuery }: { profileQuery: UseQueryResult<ProfileT, Error> }) {
  const [copied, setCopied] = useState(false)
  const onPress = () => {
    Clipboard.setString(profileQuery.data?.data?.refer_code || '')
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
          <Text className='text-base text-accent'>{profileQuery.data?.data?.refer_code || 'Loading...'}</Text>
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
