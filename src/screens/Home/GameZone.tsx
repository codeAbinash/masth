import { ArcadeIcon, Cancel01Icon, DrawingModeSolidIcon, PuzzleSolidIcon, SimulationIcon, ThunderIcon } from '@assets/icons/icons'
import Gradient from '@components/Gradient'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import ComingSoon2Svg from '@icons/coming-soon-2.svg'
import ComingSoonSvg from '@icons/coming-soon.svg'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native-gesture-handler'
import DataTablePagination from 'react-native-paper/lib/typescript/components/DataTable/DataTablePagination'
import Carousel from 'react-native-reanimated-carousel'
import type { SvgProps } from 'react-native-svg'

export default function GameZone({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-1'>
      <PaddingTop />
      {/* <Notification /> */}
      <ScrollView style={{ flex: 1, backgroundColor: colors.bgSecondary }}>
        <View>
          <View className='p-5'>
            <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
            {/* <View>
          <Tabs
          tabs={[
            { title: 'GameZone', UI: <ComingSoonGameZone /> },
            { title: 'Giveaway', UI: <ComingSoonGiveAway /> },
            ]}
            />
            </View>
            <PaddingBottom /> */}
          </View>

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
          >
            <TabsOption title='Featured' Icon={ThunderIcon} />
            <TabsOption title='Puzzle' Icon={PuzzleSolidIcon} secondary />
            <TabsOption title='Arcade' Icon={ArcadeIcon} secondary />
            <TabsOption title='Simulation' Icon={SimulationIcon} secondary />
          </ScrollView>
          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={width}
              height={width / 1.8}
              autoPlay={true}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ index }) => (
                <View className='flex-1 justify-center p-5'>
                  <View className='flex-1 items-center justify-center rounded-2xl bg-white'>
                    <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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

const { width } = Dimensions.get('window')

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
