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
import NewsFeedImage from '@images/feeds.svg'
import { colors } from '@utils/colors'
import { appStorage } from '@utils/storage'
import { StackNav } from '@utils/types'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const { width } = Dimensions.get('window')

export default function Home({ navigation }: { navigation: StackNav }) {
  return (
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
          <Text>{appStorage.getString('token')}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

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
  return (
    <View className='mt-5 rounded-3xl bg-yellowPrimary p-5'>
      <Text className='text-base text-onYellow'>Wallet Balance</Text>
      <View className='flex-row items-end'>
        <Text className='text-onYellow' style={{ fontSize: 40 }}>
          {(6860.306).toLocaleString()}
        </Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.55 }}>
          <SmallButton title='Start Mining' LeftUI={<PlayIcon width={17} height={17} />} />
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
    </View>
  )
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
