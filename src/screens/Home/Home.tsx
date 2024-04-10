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
import { check_mining_status_f, check_version_f, start_mining_f } from '@query/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { APP_V_CODE } from '@utils/constants'
import { secureLs } from '@utils/storage'
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
  useEffect(() => handleAppUpdate(navigation), [navigation])

  return (
    <>
      <PopupScreen />
      <ScrollView style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className='p-5'>
        <View className='pb-10'>
          <PaddingTop />
          <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
          <WalletBalance />
          <MSTPerUSDCard />
          <Miners />
          <TotalRemoteMining navigation={navigation} />
          <TotalLiveMining />
          <View className='mt-2 flex items-center justify-center'>
            <Text>{secureLs.getString('token')}</Text>
          </View>
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

function Miners() {
  return (
    <View className='mt-4 flex-row' style={{ gap: 18 }}>
      <ActiveMiners />
      <TotalMiners />
    </View>
  )
}

function TotalRemoteMining({ navigation }: { navigation: StackNav }) {
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
            <Text className='text-2xl'>42.0728</Text>
            <Text className='mb-0.5 text-base text-neutral-600'>MST</Text>
          </View>
          <Text className='text-base text-neutral-600'>Total Remote Mining</Text>
        </View>
        <View className='items-end'>
          <Text className='text-sm text-greenPrimary'>More than usual</Text>
          <Text className='text-sm text-greenPrimary'>1.023 MST</Text>
        </View>
      </View>
    </View>
  )
}

function ActiveMiners() {
  return (
    <View className='flex-1 rounded-3xl bg-white' style={{ gap: 15, padding: 17 }}>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='rounded-xl bg-yellowPrimary p-2'>
            <PlayBlackIcon width={18} height={18} />
          </View>
        </View>
        <View>
          <View className='flex-row items-center rounded-full bg-bgGreen px-3 py-0.5' style={{ gap: 8 }}>
            <Text className='text-base text-greenPrimary'>+5</Text>
            <ArrowUpBold width={9} height={9} color={colors.greenPrimary} />
          </View>
        </View>
      </View>
      <View>
        <Text className='text-3xl'>24</Text>
        <Text className='mt-1 text-base text-neutral-600'>Active Miners</Text>
      </View>
    </View>
  )
}

function TotalMiners() {
  return (
    <View className='flex-1 rounded-3xl bg-white' style={{ gap: 15, padding: 17 }}>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='rounded-xl bg-purplePrimary p-2'>
            <ThreeUserIcon width={18} height={18} />
          </View>
        </View>
        <View>
          <View className='flex-row items-center rounded-full bg-red-500/20 px-3 py-0.5' style={{ gap: 8 }}>
            <Text className='text-base text-red-500'>-5</Text>
            <ArrowDownBold width={9} height={9} />
          </View>
        </View>
      </View>
      <View>
        <Text className='text-3xl'>24</Text>
        <Text className='mt-1 text-base text-neutral-600'>Total Miners</Text>
      </View>
    </View>
  )
}

function TotalLiveMining() {
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
                  <Text className='text-base text-greenPrimary'>+3.2345</Text>
                  <Text style={{ fontSize: 12 }} className='pb-0.5 pl-1 text-greenPrimary'>
                    MST
                  </Text>
                </View>
                <ArrowUpBold width={9} height={9} color={colors.greenPrimary} />
              </View>
            </View>
          </View>
        </View>
        <View className='mt-1 flex-row items-end gap-x-1'>
          <Text className='text-2xl'>4289192.0728</Text>
          <Text className='mb-0.5 text-base text-neutral-600'>MST</Text>
        </View>
      </View>
    </View>
  )
}

function WalletBalance() {
  const mining = useQuery({
    queryKey: ['miningStatus'],
    queryFn: check_mining_status_f,
    retry: 3,
  })

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
          {(6860.306).toLocaleString()}
        </Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      {mining.isLoading ? (
        <View className='h-8 justify-center'>
          <Text className='text-lg'> Checking mining status...</Text>
        </View>
      ) : mining.data && !mining.data?.mining_function ? (
        <LoadingBar startTime={mining.data?.mining_data.start_time} endTime={mining.data?.mining_data.end_time} mining={mining} />
      ) : (
        <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
          <View style={{ flex: 0.55 }}>
            <SmallButton
              LeftUI={<PlayIcon width={17} height={17} />}
              onPress={handleStartMining}
              title={mining.isLoading ? 'Starting...' : 'Start Mining'}
              disabled={mining.isLoading}
            />
          </View>
          <View style={{ flex: 0.45 }} className='flex-row'>
            <Text style={{ fontSize: 15 }} className='text-onYellow'>
              50 Masth
            </Text>
            <Text style={{ fontSize: 15 }} className='text-onYellow opacity-60'>
              {' '}
              / hour
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}

const ANIM_ASPECT_RATIO = 1440 / 850
const ANIM_SIZE = 38

function LoadingBar({ startTime, endTime, mining }: { startTime: string; endTime: string; mining: ReturnType<typeof useQuery> }) {
  const [start, setStart] = React.useState(new Date(startTime).getTime())
  const [end, setEnd] = React.useState(new Date(endTime).getTime())
  const [now, setNow] = React.useState(new Date().getTime())
  const [progress, setProgress] = React.useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const total = end - start
    const current = now - start
    setProgress((current / total) * 100)
    // If the mining is finished, refetch the mining status
    if (current >= total) {
      mining.refetch()
    }
  }, [end, mining, now, progress, start])

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
        <Text className='text-center text-neutral-600'>{timeLeft(end)} Time Left</Text>
      </View>
    </>
  )
}

function timeLeft(end: number) {
  const now = new Date().getTime()
  const diff = end - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return `${adZero(hours)}:${adZero(minutes)}:${adZero(seconds)}`
}

function adZero(num: number) {
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

function MSTPerUSDCard() {
  return (
    <View className='mt-4 flex-row items-center justify-between rounded-2xl bg-white p-3.5 px-5'>
      <View style={{ gap: 5 }} className='flex-row items-center'>
        <Text className='text-base text-neutral-600'>MST / USD</Text>
        <Text className='text-base'> 0.99</Text>
        <View className='p-1.5'>
          <Icon name='info' size={17} color={'gray'} />
        </View>
      </View>
      <View>
        <Text className='text-base text-greenPrimary'>+0.08 (0.2%)</Text>
      </View>
    </View>
  )
}
