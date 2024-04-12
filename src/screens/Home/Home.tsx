import useHybridData, { setLocalData, useLocalData } from '@/hooks/useHybridData'
import MasthYellow from '@assets/icons/masth/masth-yellow.svg'
import { SmallButton } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import ThreeUserIcon from '@icons/3user.svg'
import ArrowDownBold from '@icons/arrow-down-bold.svg'
import ArrowUpBold from '@icons/arrow-up-bold.svg'
import ChartIcon from '@icons/chart.svg'
import GraphIcon from '@icons/graph.svg'
import PlayBlackIcon from '@icons/play-black.svg'
import PlayIcon from '@icons/play.svg'
import StopRound from '@icons/stop-round.svg'
import NewsFeedImage from '@images/feeds.svg'
import { check_mining_status_f, check_version_f, home_statics_f, profile_f, start_mining_f, type HomeStatisticsT, type ProfileT } from '@query/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { APP_V_CODE } from '@utils/constants'
import { StackNav } from '@utils/types'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { default as FeatherIcon, default as Icon } from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window')

function handleAppUpdate(navigation: StackNav) {
  check_version_f().then((appVersion) => {
    if (APP_V_CODE !== appVersion.version_code) {
      navigation.replace('AppUpdate', {
        link: appVersion.store_link || appVersion.custom_link || '',
      })
    }
  })
}
export default function Home({ navigation }: { navigation: StackNav }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })
  const profile = useHybridData<ProfileT>(profileQuery, 'profile')
  useEffect(() => handleAppUpdate(navigation), [navigation])

  const homeStatics = useQuery({ queryKey: ['homeStatics'], queryFn: home_statics_f })
  const home = useHybridData(homeStatics, 'homeStatics')

  useEffect(() => {
    console.log(JSON.stringify(home, null, 2))
    setLocalData(home?.active_miners, 'active_miners')
    setLocalData(home?.total_miners, 'total_miners')
    setLocalData(home?.total_remote_mining, 'total_remote_mining')
    setLocalData(home?.total_live_mining, 'total_live_mining')
    setLocalData(home?.valuation.rate, 'mstPerUSD')
  }, [home])

  // useEffect(() => {
  //   console.log(JSON.stringify(profile, null, 2))
  // }, [profile])
  return (
    <>
      <PopupScreen />
      <ScrollView style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className='p-5'>
        <View className='pb-10'>
          <PaddingTop />
          <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
          <WalletBalance profile={profile} />
          <MSTPerUSDCard home={home} />
          <Miners home={home} />
          <TotalRemoteMining navigation={navigation} home={home} />
          <TotalLiveMining home={home} />
          <View className='mt-2 flex items-center justify-center'>{/* <Text>{secureLs.getString('token')}</Text> */}</View>
        </View>
      </ScrollView>
    </>
  )
}

const { height } = Dimensions.get('window')

function PopupScreen() {
  const [modalVisible, setModalVisible] = React.useState(false)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setModalVisible(true)
  //   }, 1000)
  //   return () => clearTimeout(timer)
  // }, [])
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
        statusBarTranslucent={true}
      >
        <View style={styles.centeredView}>
          <View className='w-full'>
            <PaddingTop />
            <View className='mt-5 w-full flex-row justify-between px-5'>
              <MasthYellow width={width * 0.2} />
              <FeatherIcon name='x' size={25} color={'white'} onPress={() => setModalVisible(!modalVisible)} />
            </View>
          </View>
          <View>
            <Image source={require('@images/popup-image.jpg')} style={{ width: width * 0.9, height: width * 0.9, borderRadius: 20 }} />
            <View className='mt-7 items-center justify-center'>
              <TouchableOpacity
                activeOpacity={0.8}
                className='items-center justify-center bg-accentYellow px-4 py-3 text-white'
                style={{ minWidth: width * 0.5, borderRadius: 15 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text className='text-lg uppercase text-white'>Start Mining</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={{ height: 100 }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    width: width,
    height: height + 100,
  },
})

function Miners({ home }: { home: HomeStatisticsT | null }) {
  return (
    <View className='mt-4 flex-row' style={{ gap: 18 }}>
      <ActiveMiners home={home} />
      <TotalMiners home={home} />
    </View>
  )
}

function TotalRemoteMining({ navigation, home }: { navigation: StackNav; home: HomeStatisticsT | null }) {
  const totalRemoteMining = Number(useLocalData<number>('total_remote_mining') || 0)
  const diff = Number(home?.total_remote_mining || 0) - totalRemoteMining

  return (
    <View className='mt-4 rounded-3xl  bg-white p-5'>
      <View className='flex-row justify-between' style={{ gap: 15 }}>
        <View>
          <View className='rounded-xl bg-bgAqua p-2'>
            <GraphIcon width={18} height={18} />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Refer')}>
          <View className='flex-row items-center rounded-full bg-black/10 px-1 py-1 pl-3.5' style={{ gap: 0 }}>
            <Text style={{ fontSize: 15 }} className='pb-0.5'>
              View Team
            </Text>
            <MaterialIcon name='keyboard-arrow-right' size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <View className='mt-3 flex flex-row items-end justify-between'>
        <View>
          <View className='flex-row items-end gap-x-1'>
            <Text className='text-2xl'>{home?.total_remote_mining || 0}</Text>
            <Text className='mb-0.5 text-base text-neutral-600'>MST</Text>
          </View>
          <Text className='text-base text-neutral-600'>Total Remote Mining</Text>
        </View>
        <View className='items-end'>
          {/* <Text className='text-sm text-greenPrimary'>More than usual</Text> */}
          <Text className={`text-base ${diff < 0 ? 'text-redPrimary' : 'text-greenPrimary'}`}>
            {diff < 0 ? '' : '+'}
            {diff.toFixed(4)}
          </Text>
        </View>
      </View>
    </View>
  )
}

function ActiveMiners({ home }: { home: HomeStatisticsT | null }) {
  const activeMiners = Number(useLocalData<number>('active_miners') || 0)
  const diff = Number(home?.active_miners || 0) - activeMiners
  return (
    <View className='flex-1 rounded-3xl bg-white' style={{ gap: 15, padding: 17 }}>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='rounded-xl bg-yellowPrimary p-2'>
            <PlayBlackIcon width={18} height={18} />
          </View>
        </View>
        <View>
          <View className={`flex-row items-center rounded-full ${diff < 0 ? 'bg-redPrimary' : 'bg-bgGreen'} px-3 py-0.5`} style={{ gap: 8 }}>
            <Text className={`text-base ${diff < 0 ? 'text-redPrimary' : 'text-greenPrimary'}`}>
              {diff < 0 ? '' : '+'}
              {diff}
            </Text>
            {diff < 0 ? (
              <ArrowDownBold width={9} height={9} color={colors.redPrimary} />
            ) : (
              <ArrowUpBold width={9} height={9} color={colors.greenPrimary} />
            )}
            {/* <ArrowUpBold width={9} height={9} color={colors.greenPrimary} /> */}
          </View>
        </View>
      </View>
      <View>
        <Text className='text-3xl'>{home?.active_miners || 0}</Text>
        <Text className='mt-1 text-base text-neutral-600'>Active Miners</Text>
      </View>
    </View>
  )
}

function TotalMiners({ home }: { home: HomeStatisticsT | null }) {
  const totalMiners = Number(useLocalData<number>('total_miners') || 0)
  const diff = Number(home?.total_miners || 0) - totalMiners
  return (
    <View className='flex-1 rounded-3xl bg-white' style={{ gap: 15, padding: 17 }}>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='rounded-xl bg-purplePrimary p-2'>
            <ThreeUserIcon width={18} height={18} />
          </View>
        </View>
        <View>
          <View className={`flex-row items-center rounded-full ${diff < 0 ? 'bg-red-500' : 'bg-bgGreen'} px-3 py-0.5`} style={{ gap: 8 }}>
            <Text className={`text-base ${diff < 0 ? 'text-redPrimary' : 'text-greenPrimary'}`}>
              {diff < 0 ? '' : '+'}
              {diff}
            </Text>
            {diff < 0 ? (
              <ArrowDownBold width={9} height={9} color={colors.redPrimary} />
            ) : (
              <ArrowUpBold width={9} height={9} color={colors.greenPrimary} />
            )}
          </View>
        </View>
      </View>
      <View>
        <Text className='text-3xl'>{home?.total_miners || 0}</Text>
        <Text className='mt-1 text-base text-neutral-600'>Total Miners</Text>
      </View>
    </View>
  )
}

function TotalLiveMining({ home }: { home: HomeStatisticsT | null }) {
  const totalLiveMining = Number(useLocalData<number>('total_live_mining') || 0)
  const diff = Number(home?.total_live_mining || 0) - totalLiveMining
  return (
    <View className='mt-4 flex-row rounded-3xl bg-white p-5' style={{ gap: 15 }}>
      <View>
        <View className='rounded-xl bg-bgGreen p-2'>
          <ChartIcon width={18} height={18} />
        </View>
      </View>
      <View style={{ gap: 4, flex: 1 }}>
        <View>
          <View className='flex-row items-center justify-between '>
            <Text className='text-base text-neutral-600'>Total Live Mining</Text>
            <View>
              <View className='flex-row items-center rounded-full bg-bgGreen px-2 py-0.5' style={{ gap: 5 }}>
                <View className='flex-row items-end'>
                  <Text className={`text-base ${diff < 0 ? 'text-redPrimary' : 'text-greenPrimary'}`}>
                    {diff < 0 ? '' : '+'}
                    {diff.toFixed(3)}
                  </Text>
                  <Text style={{ fontSize: 12 }} className='pb-0.5 pl-1 text-greenPrimary'>
                    MST
                  </Text>
                </View>
                {diff < 0 ? (
                  <ArrowDownBold width={9} height={9} color={colors.redPrimary} />
                ) : (
                  <ArrowUpBold width={9} height={9} color={colors.greenPrimary} />
                )}
              </View>
            </View>
          </View>
        </View>
        <View className='mt-1 flex-row items-end gap-x-1'>
          <Text className='text-2xl'>{home?.total_live_mining || 0}</Text>
          <Text className='mb-0.5 text-base text-neutral-600'>MST</Text>
        </View>
      </View>
    </View>
  )
}

function WalletBalance({ profile }: { profile: ProfileT | null }) {
  const [balance, setBalance] = React.useState(Number(profile?.data.coin || 0))
  const mining = useQuery({
    queryKey: ['miningStatus'],
    queryFn: check_mining_status_f,
    retry: 3,
  })

  useEffect(() => {
    console.log(JSON.stringify(mining.data, null, 2))
  }, [mining.data])

  const startMining = useMutation({
    mutationKey: ['startMining'],
    mutationFn: start_mining_f,
    onSuccess: (data) => {
      console.log('Mining started')
      mining.refetch()
    },
  })

  function handleStartMining() {
    startMining.mutate()
  }

  return (
    <View className={`${!mining.data?.mining_function ? 'bg-white' : 'bg-yellowPrimary'} mt-5 rounded-3xl p-5`}>
      <Text className='text-base text-onYellow'>Wallet Balance</Text>
      <View className='flex-row items-end'>
        <Text className='text-onYellow' style={{ fontSize: 40 }}>
          {balance.toFixed(4)}
        </Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      {mining.isLoading || mining.isPending || mining.isFetching || mining.isRefetching ? (
        <View className='h-8 justify-center'>
          <Text className='text-lg'> Checking mining status...</Text>
        </View>
      ) : mining.data && !mining.data?.mining_function ? (
        <LoadingBar
          currentTime={mining.data.mining_data.current_time}
          setBalance={setBalance}
          realBalance={Number(profile?.data.coin || 0)}
          startTime={mining.data?.mining_data.start_time}
          endTime={mining.data?.mining_data.end_time}
          mining={mining}
          coin={Number(mining.data.mining_data.coin)}
        />
      ) : (
        <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
          <View style={{ flex: 0.55 }}>
            <SmallButton
              LeftUI={<PlayIcon width={17} height={17} />}
              onPress={handleStartMining}
              title={startMining.isPending ? 'Starting...' : 'Start Mining'}
              disabled={startMining.isPending}
            />
          </View>
          <View style={{ flex: 0.45 }} className='flex-row'>
            <Text style={{ fontSize: 15 }} className='text-onYellow'>
              1 Masth
            </Text>
            <Text style={{ fontSize: 15 }} className='text-onYellow opacity-60'>
              {' '}
              / Hour
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const ANIM_ASPECT_RATIO = 1440 / 850
const ANIM_SIZE = 38

function LoadingBar({
  currentTime,
  startTime,
  endTime,
  mining,
  coin,
  realBalance: balance,
  setBalance,
}: {
  currentTime: string
  startTime: string
  endTime: string
  mining: ReturnType<typeof useQuery>
  coin: number
  realBalance: number
  setBalance: React.Dispatch<React.SetStateAction<number>>
}) {
  const [start, setStart] = React.useState(new Date(startTime).getTime())
  const [end, setEnd] = React.useState(new Date(endTime).getTime())
  const [cur, setCur] = React.useState(new Date(currentTime).getTime())
  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCur((prev) => prev + 1000), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let timer: any
    const total = end - start
    const current = cur - start
    const p = (current / total) * 100
    setProgress(p > 100 ? 100 : p)

    // If the mining is finished, refetch the mining status
    if (current >= total || progress >= 100) {
      timer = setTimeout(() => {
        mining.refetch()
      }, 5000)
      setBalance(balance + coin)
    } else {
      const extraBalance = (current / total) * coin
      setBalance(balance + extraBalance)
    }

    return () => timer && clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur])

  return (
    <>
      <View className='mt-2 flex-row overflow-hidden rounded-full bg-[#f0efef]'>
        <View className='flex-row items-center'>
          <View
            className='flex-row items-center px-3'
            style={{
              backgroundColor: '#67cf5f',
              width: `${progress > 100 ? 100 : Math.max(progress, 0)}%`,
              height: 38,
            }}
          >
            <StopRound width={20} height={20} style={{ zIndex: 10 }} />
          </View>
          <LottieView
            source={require('../../assets/anim/loading_anim.lottie')}
            autoPlay
            loop
            style={{
              width: ANIM_SIZE * ANIM_ASPECT_RATIO,
              height: ANIM_SIZE,
              zIndex: -1,
            }}
            speed={6}
          />
        </View>
      </View>
      <View className='mt-1 flex-row justify-between px-1.5'>
        <Text className='text-center text-neutral-600'>{progress.toFixed(2)}% Completed</Text>
        <Text className='text-center text-neutral-600'>{timeLeft(cur, end)} Time Left</Text>
      </View>
    </>
  )
}

function timeLeft(cur: number, end: number) {
  const now = new Date(cur).getTime()
  const diff = end - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `${adZero(hours)}:${adZero(minutes)}:${adZero(seconds)}`
}

function adZero(num: number) {
  if (num <= 0) return '00'
  return num < 10 ? `0${num}` : num
}

function NewsFeed() {
  return (
    <View className='mt-5 flex-1 justify-between'>
      <View>
        <Text className='text-3xl'>News Feed</Text>
        <Text className='text-lg'>Read news and earn math coins</Text>
      </View>
      <View className='items-center justify-center gap-7'>
        <NewsFeedImage width={width * 0.8} />
        <View>
          <Text className='text-center text-3xl'> Coming Soon</Text>
          <Text className='text-center'>This feature will be available soon.</Text>
        </View>
      </View>
      <View />
      <View />
    </View>
  )
}

function MSTPerUSDCard({ home }: { home: HomeStatisticsT | null }) {
  const mstPerUSD = Number(useLocalData<number>('mstPerUSD') || 0)
  const diff = Number(home?.valuation.rate || 0) - mstPerUSD
  const diffPercent = diff === 0 || mstPerUSD === 0 ? 0 : (diff / mstPerUSD) * 100
  return (
    <View className='mt-4 flex-row items-center justify-between rounded-2xl bg-white p-3.5 px-5'>
      <View style={{ gap: 5 }} className='flex-row items-center'>
        <Text className='text-base text-neutral-600'>
          MST / {home?.valuation.currency} {home?.valuation.rate}
        </Text>
        {/* <Text className='text-base'></Text>  */}
        {/* <Tooltip
          title='Masth,calculates coin value using a smart system created by “Nexgino Technology Solutions”. It considers mining, downloads, and user activity every day for accurate valuation.'
          enterTouchDelay={0}
        > */}
        <TouchableOpacity
          className='p-1.5'
          onPress={() =>
            Alert.alert(
              'Masth',
              'Masth,calculates coin value using a smart system created by “Nexgino Technology Solutions”. It considers mining, downloads, and user activity every day for accurate valuation.',
            )
          }
        >
          <Icon name='info' size={17} color={'gray'} />
        </TouchableOpacity>
        {/* </Tooltip> */}
      </View>
      <View>
        <Text className={`text-base ${diff < 0 ? 'text-redPrimary' : 'text-greenPrimary'}`}>
          {/* +0.08 (0.2%) */}
          {diff < 0 ? '' : '+'}
          {diff.toFixed(2)} ({Math.abs(diffPercent).toFixed(2)}%)
        </Text>
      </View>
    </View>
  )
}
