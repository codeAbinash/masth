import { Button, SmallButton } from '@components/Button'
import PlayIcon from '@icons/play.svg'
import StopRound from '@icons/stop-round.svg'
import { check_mining_status_f, start_mining_f, type ProfileT } from '@query/api'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, type UseMutationResult } from '@tanstack/react-query'
import { rewardAdId } from '@utils/constants'
import { ls } from '@utils/storage'
import { RootStackParamList } from 'App'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import { AdEventType, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads'
import { OneSignal } from 'react-native-onesignal'

const adUnitId = rewardAdId
const rewarded = RewardedAd.createForAdRequest(adUnitId)
const { height, width } = Dimensions.get('window')

export default function MiningOrWalletBalance({ profile }: { profile: ProfileT | null }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [balance, setBalance] = React.useState(Number(profile?.data.coin || 0))
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isFailed, setIsFailed] = React.useState(false)

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const mining = useQuery({
    queryKey: ['miningStatus'],
    queryFn: check_mining_status_f,
    retry: 3,
  })

  // useEffect(() => {
  //   console.log(JSON.stringify(mining.data, null, 2))
  // }, [mining.data])

  const startMining = useMutation({
    mutationKey: ['startMining'],
    mutationFn: start_mining_f,
    onSuccess: (data) => {
      console.log('Mining started')
      mining.refetch()
    },
  })

  function startMiningHandler() {
    startMining.mutate()
    console.log('Mining started')
    // If not rated show the rate us screen
    console.log('Rated', ls.getString('rated'))
    if (!ls.getString('rated')) {
      navigation.navigate('RateUs')
    }
  }

  // Load the rewarded ad
  useEffect(() => {
    rewarded.load()
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsLoaded(true)
      console.log('Ad loaded')
    })

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of', reward)
      startMiningHandler()
    })

    const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
      // Ad failed to load so set the isLoaded to true so that the user can start mining
      console.log('Ad failed to load', error)
      setIsFailed(true)
    })

    return () => {
      unsubscribeLoaded()
      unsubscribeEarned()
      unsubscribeError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation])

  function handleStartMining() {
    try {
      if (isLoaded && !isFailed) {
        OneSignal.Notifications.requestPermission(true)
        rewarded.show()
        console.log('Showing Ad...')
      } else if (isFailed) {
        startMiningHandler()
      } else {
        setModalVisible(true)
      }
    } catch (error) {
      setModalVisible(true)
      rewarded.load()
      console.log('Error in showing ad', error)
    }
  }
  return (
    <>
      <View className={`${!mining.data?.mining_function ? 'bg-white' : 'bg-yellowPrimary'} mt-5 rounded-3xl p-5`}>
        <Text className='text-base text-onYellow'>Wallet Balance</Text>
        <View className='flex-row items-end'>
          <Text className='text-onYellow' style={{ fontSize: 40 }}>
            {balance.toFixed(4)}
          </Text>
          <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
        </View>
        {
          /* {mining.isLoading || mining.isPending || mining.isFetching || mining.isRefetching ? (
          <View className='h-8 justify-center'>
            <Text className='text-lg'> Checking mining status...</Text>
          </View>
        ) : */
          mining.data && !mining.data?.mining_function ? (
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
                  title={getStatusString(mining, startMining.isPending, isLoaded, isFailed)}
                  disabled={getIsButtonDisabled(mining, startMining as UseMutationResult<unknown, unknown, unknown, unknown>, isFailed, isLoaded)}
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
          )
        }
      </View>
      <AdLoafFailedPopupUi modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  )
}

function getIsButtonDisabled(
  mining: ReturnType<typeof useQuery>,
  startMining: ReturnType<typeof useMutation>,
  isFailed: boolean,
  isLoaded: boolean,
): boolean {
  return mining.isLoading || mining.isPending || mining.isFetching || mining.isRefetching || startMining.isPending || !(isFailed || isLoaded)
}

function getStatusString(mining: ReturnType<typeof useQuery>, isPending: boolean, isLoaded: boolean, isFailed: boolean): string {
  if (mining.isLoading || mining.isPending || mining.isFetching || mining.isRefetching) return 'Connecting...'
  if (isFailed) return 'Start Mining'
  if (!isLoaded) return 'Connecting....'
  if (isPending) return 'Starting...'
  return 'Start Mining'
}

function AdLoafFailedPopupUi({ modalVisible, setModalVisible }: { modalVisible: boolean; setModalVisible: (val: boolean) => void }) {
  if (!modalVisible) return null
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        statusBarTranslucent={true}
      >
        <View style={[styles.centeredView, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <View className='flex items-center justify-center rounded-3xl bg-white px-7 py-7' style={{ width: width * 0.9 }}>
            <LottieView
              source={require('@assets/anim/disconnected.lottie')}
              autoPlay
              loop
              style={{
                width: width * 0.7,
                height: width * 0.7,
              }}
            />
            <Text className='mt-5 text-center text-lg text-gray-500'>
              Uh-oh! Looks like your device is having trouble connecting to our mining server. Please click on 'Start Mining' again to try again.
            </Text>
            <Button title='Ok, Got it' className='mt-10' onPress={() => setModalVisible(!modalVisible)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: width,
    height: height + 100,
  },
})

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
  const curr_diff_now = new Date(currentTime).getTime() - new Date().getTime()
  const [cur, setCur] = React.useState(new Date(currentTime).getTime() + curr_diff_now)
  const [progress, setProgress] = React.useState(0)
  useEffect(() => {
    // const interval = setInterval(() => setCur((prev) => prev + 1000), 1000)
    // return () => clearInterval(interval)
    console.log('Mining started')
    const timer = setInterval(() => {
      setCur(curr_diff_now + new Date().getTime())
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            source={require('@assets/anim/loading_anim.lottie')}
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
