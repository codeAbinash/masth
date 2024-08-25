import { ArcadeIcon, Cancel01Icon, Clock01SolidIcon, MWhiteIcon, PeopleIcon, PuzzleSolidIcon, SimulationIcon, ThunderIcon } from '@assets/icons/icons'
import Gradient, { LRGradient } from '@components/Gradient'
import Loading from '@components/Loading'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import ComingSoon2Svg from '@icons/coming-soon-2.svg'
import ComingSoonSvg from '@icons/coming-soon.svg'
import { get_games_f, type Games, type GamesData } from '@query/api'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Bold, Medium, Regular, SemiBold } from '@screens/fonts'
import { useQuery } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import { defaultGrad, getPlayDuration, getProgressColor } from '@utils/utils'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import type { SvgProps } from 'react-native-svg'

type GameCategories = 'Featured' | 'Puzzle' | 'Arcade' | 'Simulation'

const { width, height } = Dimensions.get('window')

export default function GameZone({ navigation }: { navigation: StackNav }) {
  const [category, setCategory] = useState<GameCategories>('Featured')

  return (
    <View className='flex-1'>
      <PaddingTop />
      {/* <Notification /> */}
      <ScrollView style={{ flex: 1, backgroundColor: colors.bgSecondary }} contentContainerStyle={{ paddingBottom: 50 }}>
        <View className='flex-1'>
          <View className='p-5'>
            <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
          </View>

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
          >
            <TabsOption onPress={() => setCategory('Featured')} title='Featured' Icon={ThunderIcon} secondary={category !== 'Featured'} />
            <TabsOption onPress={() => setCategory('Puzzle')} title='Puzzle' Icon={PuzzleSolidIcon} secondary={category !== 'Puzzle'} />
            <TabsOption onPress={() => setCategory('Arcade')} title='Arcade' Icon={ArcadeIcon} secondary={category !== 'Arcade'} />
            <TabsOption onPress={() => setCategory('Simulation')} title='Simulation' Icon={SimulationIcon} secondary={category !== 'Simulation'} />
          </ScrollView>
        </View>
        <MainContent category={category} />
      </ScrollView>
    </View>
  )
}

function MainContent({ category }: { category: GameCategories }) {
  const [games, setGames] = useState<Games[]>([])
  const isFocused = useIsFocused()
  const filteredGames = games.filter((game) => game.category === category)

  const { isPending, data, error, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: () => get_games_f(),
  })

  const status = getPlayDuration(data?.playTime || 0)

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused, refetch])

  useEffect(() => {
    setGames(data?.data || [])
    console.log(data?.playTime)
  }, [data])

  if (!data || isPending)
    return (
      <View style={{ height: height * 0.75 }} className='items-center justify-center p-5'>
        <Loading />
      </View>
    )

  return (
    <>
      <Carousal data={data} />
      <TimeArea
        x={status.x}
        progress={status.progress * 10}
        timeString={`${10 - status.progress} minutes left`}
        colors={getProgressColor(status.progress)}
      />
      <Games filteredGames={filteredGames} category={category} x={status.x} />
    </>
  )
}

type TimeAreaProps = {
  text?: string
  progress?: number
  timeString?: string
  colors: Array<string>
  x: number
}
function TimeArea({ text, progress = 1, timeString, colors: Colors, x }: TimeAreaProps) {
  return (
    <View className='p-5'>
      <View className='flex-row justify-between rounded-3xl bg-white p-4' style={{ gap: 15 }}>
        <Gradient grad={Colors || defaultGrad} className='h-16 w-16 flex-row items-center justify-center rounded-2xl'>
          <ThunderIcon height={25} width={25} className='text-black' />
          <Bold className='text-2xl'>
            {x || 0}
            <Medium className='font-normal'>x</Medium>
          </Bold>
        </Gradient>
        <View className='flex-1 justify-between' style={{ gap: 5 }}>
          <SemiBold className='text-base'>{text || 'Play More & Earn More'}</SemiBold>
          <View className='w-full rounded-full bg-bgSecondary'>
            <LRGradient grad={Colors || defaultGrad} className='h-2 rounded-full' style={{ width: progress + '%' }} />
          </View>
          <View className='flex-row items-center' style={{ gap: 5 }}>
            <Clock01SolidIcon width={16} height={16} className='text-zinc-500' />
            <Medium className='text-zinc-500'>{timeString}</Medium>
          </View>
        </View>
      </View>
    </View>
  )
}

const aspect = 1.55

function Games({ filteredGames, category, x }: { filteredGames: Games[]; category: GameCategories; x: number }) {
  const navigation = useNavigation<StackNav>()
  return (
    <View>
      {filteredGames.length === 0 && (
        <View className='h-60 flex-1 items-center justify-center px-5'>
          <Medium className='text-center text-lg'>No Games Available for the category '{category}'</Medium>
        </View>
      )}
      <View>
        {filteredGames.map((game, i) => (
          <Game key={i} game={game} navigation={navigation} x={x} />
        ))}
      </View>
    </View>
  )
}

function Game({ game, navigation, x }: { game: Games; navigation: StackNav; x: number }) {
  return (
    <TouchableOpacity
      className='relative w-full p-5'
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Playing', { url: game.gameWebLink || '', gameID: game.gameId || '' })}
    >
      <View className='absolute m-5 w-full rounded-3xl bg-gray-200'>
        <Image source={{ uri: game.thumbnail }} className='w-full rounded-3xl' style={{ aspectRatio: aspect }} />
      </View>
      <View className='w-full justify-between p-4' style={{ aspectRatio: aspect }}>
        <View className='flex-row justify-between'>
          <View className='flex-row items-center gap-x-2'>
            <View className='h-2 w-2 rounded-full bg-red-500' />
            <Medium className='text-sm text-white'>LIVE</Medium>
          </View>
          <View className='flex-row gap-x-1 rounded-full bg-white/20 py-1.5 pl-1 pr-3'>
            <PeopleIcon width={14} height={14} />
            <Medium className='text-xs text-white'>3K</Medium>
          </View>
        </View>
        <View className='justify-between'>
          <Bold className='text-lg text-white' numberOfLines={1}>
            {game.gameName}
          </Bold>
          <View className='mt-1.5 flex-row justify-between'>
            <RewardCoins coins={game.rewardCoins || 0} x={x} />
            <PlayNowButton game={game} navigation={navigation} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function RewardCoins({ coins, x }: { coins: number; x: number }) {
  return (
    <View className='flex-row items-center gap-x-2'>
      <View className='flex-row items-center gap-x-0.5 rounded-full border border-white/50 px-2 py-1.5'>
        <MWhiteIcon width={10} height={10} />
        <Bold className='pl-1 text-xs text-white'>
          {coins}
          <Regular className='text-xs'> / min</Regular>
        </Bold>
      </View>
      <Medium className='text-white'>X</Medium>
      <View className='flex-row items-center rounded-full border border-white/50 px-2 py-1.5'>
        <SemiBold className='text-xs text-white'>{x}X</SemiBold>
      </View>
    </View>
  )
}
function PlayNowButton({ game, navigation }: { game: Games; navigation: StackNav }) {
  return (
    <View className='items-center justify-center'>
      <TouchableOpacity
        className='rounded-xl bg-white px-10 py-3'
        onPress={() => navigation.navigate('Playing', { url: game.gameWebLink || '', gameID: game.gameId || '' })}
      >
        <Bold className='text-sm text-black'>Play Now</Bold>
      </TouchableOpacity>
    </View>
  )
}

function Carousal({ data }: { data: GamesData }) {
  const [page, setPage] = useState(0)

  return (
    <>
      <View style={{ flex: 1 }} className='mb-4 mt-5'>
        <Carousel
          loop
          width={width}
          height={width * 0.45}
          autoPlay={true}
          data={data?.carousal || []}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          renderItem={({ index }) => (
            <View className='flex-1 justify-center px-5'>
              <Image source={{ uri: data?.carousal?.[index].imgSrc }} className='flex-1 rounded-3xl' />
            </View>
          )}
          onProgressChange={(_, p) => setPage(Math.floor(p))}
        />
      </View>
      <View className='flex-row items-center justify-center' style={{ gap: 5 }}>
        {(data?.carousal || []).map((_, i) => (
          <View className={`${i === page ? 'bg-black' : 'bg-gray-200'} h-1 w-5 rounded-full`} key={i} />
        ))}
      </View>
    </>
  )
}

function Notification() {
  return (
    <View className='p-5 pt-3' style={{ gap: 10 }}>
      <TouchableOpacity className='items-end'>
        <Cancel01Icon width={22} height={22} className='p-2.5 text-black' />
      </TouchableOpacity>
      <View className='flex-row items-center justify-between'>
        <View>
          <SemiBold className='text-left text-xl'>Instagram</SemiBold>
          <Medium className='text-lg'>Have you check our new Instagram post</Medium>
        </View>
        <GradientBtn title='Follow' />
      </View>
    </View>
  )
}

type GradientBtnProps = TouchableOpacityProps & {
  Left?: React.ReactNode
  title: string
  disabled?: boolean
}
function GradientBtn({ disabled, Left, title, ...rest }: GradientBtnProps) {
  return (
    <TouchableOpacity {...rest} activeOpacity={0.7} disabled={disabled}>
      <Gradient className='rounded-full p-2 px-5'>
        {Left}
        <SemiBold className={`${disabled ? 'text-white' : 'text-black'} text-center text-lg font-bold`}>{title}</SemiBold>
      </Gradient>
    </TouchableOpacity>
  )
}

type TabsOptionProps = TouchableOpacityProps & {
  title: string
  Icon: React.FC<SvgProps>
  secondary?: boolean
}
function TabsOption({ title, secondary, Icon, ...rest }: TabsOptionProps) {
  return (
    <TouchableOpacity
      className={`flex-row rounded-full ${!secondary ? 'bg-black' : 'bg-white'} py-2.5 pl-3 pr-4`}
      style={{ gap: 10 }}
      activeOpacity={0.7}
      {...rest}
    >
      <Icon width={18} height={18} color={secondary ? 'black' : 'white'} />
      <SemiBold className={`text-sm ${!secondary ? 'text-white' : 'text-black'}`}>{title}</SemiBold>
    </TouchableOpacity>
  )
}

function ComingSoonGiveAway() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoon2Svg width={width * 0.85} />
      <SemiBold className='mt-5 text-2xl'>Coming Soon</SemiBold>
      <Medium className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        Giveaway feature is under development and will be available soon. Stay tuned!
      </Medium>
    </View>
  )
}
function ComingSoonGameZone() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoonSvg width={width * 0.85} />
      <SemiBold className='mt-5 text-2xl'>Coming Soon</SemiBold>
      <Medium className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        GameZone feature is under development and will be available soon. Stay tuned!
      </Medium>
    </View>
  )
}
