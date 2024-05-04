import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import { colors } from '@utils/colors'
import type { NavProp } from '@utils/types'
import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import PopupUi from './Home/PopupUi'
import { Button } from '@components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DoubleArrow from '@icons/double-arrow.svg'
import UsersIcon from '@icons/users.svg'
import Images from '@assets/images/images'
import SendIcon from '@icons/send.svg'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import type { RootStackParamList } from 'App'
import Carousel from 'react-native-reanimated-carousel'
import GraphIcon from '@icons/graph.svg'
import CurvesIcon from '@icons/curves.svg'

export default function HomeScreen({ navigation }: NavProp) {
  return (
    <>
      <PopupUi />
      <ScrollView style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className=''>
        <View className='p-5'>
          <PaddingTop />
          <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
          <TodayMined />
          <LiveUsers />
          <Detailed />
        </View>
        <Banners />
        <View className='h-10' />
      </ScrollView>
    </>
  )
}

function TodayMined() {
  return (
    <View>
      <Text className='mt-5 text-lg text-gray-500'>Today Mined</Text>
      <View className='flex-row items-end'>
        <Text
          className='mt-1.5 font-medium'
          style={{
            fontSize: 40,
          }}
        >
          {(65156135).toLocaleString()}
        </Text>
        <Text className='mb-1 ml-2 text-2xl text-accent'>MST</Text>
      </View>
      <ButtonFullSecondary />
    </View>
  )
}
function ButtonFullSecondary() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='bg-secondary mt-5 flex-row items-center justify-center rounded-full p-4'
      onPress={() => navigation.navigate('Mining')}
    >
      <DoubleArrow height={11} width={11} color='black' />
      <Text className='pl-3 text-base text-black'>Initiate Mining</Text>
    </TouchableOpacity>
  )
}

function LiveUsers() {
  return (
    <View className='mt-6 flex-row' style={{ gap: 15 }}>
      <View className='aspect-square items-center justify-center rounded-2xl bg-white'>
        <UsersIcon height={30} width={30} />
      </View>
      <View className='flex-1 rounded-2xl bg-white px-5 py-2 pb-3' style={{ gap: 10 }}>
        <View className='flex-row items-center'>
          <Text className='text-lg text-black'>Live Users</Text>
          <View className='ml-1 mt-0.5 h-2 w-2 rounded-full bg-red-500' />
        </View>
        <View className='flex flex-row'>
          <View style={{ marginLeft: 10 }} className='flex flex-row'>
            <Image source={Images.user3} style={styles.smallUserImage} className='z-30' />
            <Image source={Images.user1} style={styles.smallUserImage} className='z-20' />
            <Image source={Images.user2} style={styles.smallUserImage} className='z-10' />
          </View>
          <Text className='ml-3 text-3xl font-medium text-accent'>3000</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  smallUserImage: {
    width: 28,
    height: 28,
    borderRadius: 100,
    marginLeft: -10,
    borderWidth: 0,
    borderColor: 'transparent',
  },
})

function Detailed() {
  return (
    <View className='mt-6 flex-row' style={{ gap: 15 }}>
      <ReferAndEarn />
      <Graph />
    </View>
  )
}

function ReferAndEarn() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  return (
    <View className='aspect-square flex-1 justify-center rounded-3xl bg-white p-5'>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('Refer')
        }}
      >
        <SendIcon height={25} width={25} />
        <Text className='mt-3 text-gray-500' style={{ fontSize: 22 }}>
          Refer & Earn <Text className='text-accent'>1MST</Text> Every Time{' '}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

function Graph() {
  return (
    <View className='aspect-square flex-1 justify-center rounded-3xl bg-white p-5 py-4'>
      <Text className='text-lg text-gray-500'>
        MST/USD <Text className='text-black'>0.99</Text>
      </Text>
      <View className='w-full flex-1 items-center justify-center'>
        <CurvesIcon color={colors.greenPrimary} />
      </View>
      <Text className='text-xl text-greenPrimary'>+0.08(0.2%)</Text>
    </View>
  )
}

const IMAGES = [
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRytg2E3AO0fwQzt9uk4T3BjfFF16z_1Pubt4oZmkbY8xWP88OI0WWtSXqlABX6TKpGl9s&usqp=CAU',
  // 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Bitcoin_BTC_golden_coin_with_the_symbol.jpg'
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_DAQVEl4h1V-wEXSRlEScsJh1zB6XufZZYR7HazMu3n0JEF02AaRcuN0IBNssRZsbGkU&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjTrVTPa85BWxL0c-lMR0X-A6BO6xEEOvNRA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XOZ327VSOsA-01VXDby3D4JW71i1Et3Gaw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeacEY-BhJSjTKrz2r6US_r0bz0n0kUk5b56_3sLPtsEDQL_cl377DspWtwO76uY2cfgM&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLODn2sMooDq2VbUHO9fgFgyMdSV2YrHXgfoEZKhoUAgyXtwLhtF-450fnvb9X5e9G5Ro&usqp=CAU',
]

const width = Dimensions.get('window').width
function Banners() {
  return (
    <TouchableOpacity style={{ flex: 1 }} className='mt-2' activeOpacity={1}>
      <Carousel
        loop
        pagingEnabled
        width={width}
        height={width / 2.5}
        autoPlay={true}
        data={IMAGES}
        scrollAnimationDuration={1000}
        autoPlayInterval={2000}
        renderItem={({ index }) => (
          // <View className='mx-1 flex-1 justify-center rounded-2xl border border-gray-500'>
          //   <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
          // </View>

          <Image source={{ uri: IMAGES[index] }} className='mx-5 flex-1 justify-center rounded-3xl' key={index} />
        )}
      />
    </TouchableOpacity>
  )
}
