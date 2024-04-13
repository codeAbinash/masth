import PlayIcon from '@icons/play.svg'
import StopRound from '@icons/stop-round.svg'
import { SmallButton } from '@components/Button'
import { type ProfileT, check_mining_status_f, start_mining_f } from '@query/api'
import { useQuery, useMutation } from '@tanstack/react-query'
import LottieView from 'lottie-react-native'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

export default function MiningOrWalletBalance({ profile }: { profile: ProfileT | null }) {
  const [balance, setBalance] = React.useState(Number(profile?.data.coin || 0))
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
