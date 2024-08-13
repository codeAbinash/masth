import { ArcadeIcon, Cancel01Icon, Clock01SolidIcon, MWhiteIcon, PeopleIcon, PuzzleSolidIcon, SimulationIcon, ThunderIcon } from '@assets/icons/icons'
import Gradient, { LRGradient } from '@components/Gradient'
import Loading from '@components/Loading'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import ComingSoon2Svg from '@icons/coming-soon-2.svg'
import ComingSoonSvg from '@icons/coming-soon.svg'
import { get_games_f, type Games, type GamesData } from '@query/api'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
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

  const filteredGames = games.filter((game) => game.category === category)

  const { isPending, data, error } = useQuery({
    queryKey: ['games'],
    queryFn: () => get_games_f(),
  })

  useEffect(() => {
    setGames(data?.data || [])
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
      <TimeArea progress={37} timeString='10 minutes left' />
      <Games filteredGames={filteredGames} category={category} />
    </>
  )
}
type TimeAreaProps = {
  text?: string
  progress?: number
  timeString?: string
  grad?: Array<string>
}
const defaultGrad = ['#F9A61E', '#FFD185']
function TimeArea({ text, progress, grad, timeString }: TimeAreaProps) {
  return (
    <View className='p-5'>
      <View className='flex-row justify-between rounded-3xl bg-white p-4' style={{ gap: 15 }}>
        <Gradient grad={grad || defaultGrad} className='h-16 w-16 flex-row items-center justify-center rounded-2xl'>
          <ThunderIcon height={25} width={25} className='text-black' />
          <Text className='text-2xl font-bold'>
            2<Text className='font-normal'>x</Text>
          </Text>
        </Gradient>
        <View className='flex-1 justify-between' style={{ gap: 5 }}>
          <Text className='text-lg'>{text || 'Play More & Earn More'}</Text>
          <View className='w-full rounded-full bg-bgSecondary'>
            <LRGradient grad={grad || defaultGrad} className='h-2 rounded-full' style={{ width: progress + '%' }} />
          </View>
          <View className='flex-row items-center' style={{ gap: 5 }}>
            <Clock01SolidIcon width={16} height={16} className='text-zinc-500' />
            <Text className='text-zinc-500'>{timeString}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const aspect = 1.55

function Games({ filteredGames, category }: { filteredGames: Games[]; category: GameCategories }) {
  const navigation = useNavigation<StackNav>()
  return (
    <View>
      {filteredGames.length === 0 && (
        <View className='h-60 flex-1 items-center justify-center px-5'>
          <Text className='text-center text-xl'>No Games Available for the category '{category}'</Text>
        </View>
      )}
      <View>
        {filteredGames.map((game, i) => (
          <TouchableOpacity
            key={i}
            className='relative w-full p-5'
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Playing', { url: game.gameWebLink || '' })}
          >
            <View className='absolute m-5 w-full rounded-3xl bg-gray-200'>
              <Image source={{ uri: game.thumbnail }} className='w-full rounded-3xl' style={{ aspectRatio: aspect }} />
            </View>
            <View className='w-full justify-between p-4' style={{ aspectRatio: aspect }}>
              <View className='flex-row justify-between'>
                <View className='flex-row items-center gap-x-2'>
                  <View className='h-2 w-2 rounded-full bg-red-500' />
                  <Text className='text-sm text-white'>LIVE</Text>
                </View>
                <View className='flex-row gap-x-1 rounded-full bg-white/20 py-1.5 pl-1 pr-3'>
                  <PeopleIcon width={14} height={14} />
                  <Text className='text-xs text-white'>3K</Text>
                </View>
              </View>
              <View className='flex-row items-end justify-between'>
                <View className='justify-center gap-y-2'>
                  <Text className='text-lg font-bold text-white'>{game.gameName}</Text>
                  <View className='flex-row items-center gap-x-2'>
                    <View className='flex-row items-center gap-x-0.5 rounded-full border border-white/50 px-2 py-1.5'>
                      <MWhiteIcon width={10} height={10} />
                      <Text className='text-xs text-white'>
                        {game.rewardCoins}
                        <Text className='text-xs'>/min</Text>
                      </Text>
                    </View>
                    <Text className='text-white'>X</Text>
                    <View className='flex-row items-center rounded-full border border-white/50 px-2 py-1.5'>
                      <Text className='text-xs text-white'>2X</Text>
                    </View>
                  </View>
                </View>
                <View className='items-center justify-center'>
                  <TouchableOpacity
                    className='rounded-xl bg-white/20 px-10 py-3'
                    onPress={() => navigation.navigate('Playing', { url: game.gameWebLink || '' })}
                  >
                    <Text className='text-sm text-white'>Play Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
          <Text className='text-left text-xl font-bold'>Instagram</Text>
          <Text className='text-lg'>Have you check our new Instagram post</Text>
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
        <Text className={`${disabled ? 'text-white' : 'text-black'} text-center text-lg font-bold`}>{title}</Text>
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
      <Text className={`text-base ${!secondary ? 'text-white' : 'text-black'}`}>{title}</Text>
    </TouchableOpacity>
  )
}

function ComingSoonGiveAway() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoon2Svg width={width * 0.85} />
      <Text className='mt-5 text-2xl'>Coming Soon</Text>
      <Text className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        Giveaway feature is under development and will be available soon. Stay tuned!
      </Text>
    </View>
  )
}
function ComingSoonGameZone() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoonSvg width={width * 0.85} />
      <Text className='mt-5 text-2xl'>Coming Soon</Text>
      <Text className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        GameZone feature is under development and will be available soon. Stay tuned!
      </Text>
    </View>
  )
}
