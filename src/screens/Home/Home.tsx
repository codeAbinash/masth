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
      </View>
    </ScrollView>
  )
}

function Miners() {
  return (
    <View className='mt-5 flex-row' style={{ gap: 20 }}>
      <ActiveMiners />
      <TotalMiners />
    </View>
  )
}

function TotalRemoteMining({ navigation }: { navigation: StackNav }) {
  return (
    <View className='mt-5 rounded-3xl  bg-white p-5'>
      <View className='flex-row justify-between' style={{ gap: 15 }}>
        <View>
          <View className='rounded-xl bg-bgAqua p-2.5'>
            <GraphIcon width={20} height={20} />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Refer')}>
          <View className='flex-row items-center rounded-full bg-black/10 px-1 py-1 pl-3.5' style={{ gap: 5 }}>
            <Text style={{ fontSize: 16 }}>View Team</Text>
            <MaterialIcon name='keyboard-arrow-right' size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <View className='mt-3 flex flex-row items-end justify-between'>
        <View>
          <View className='flex-row items-end gap-x-2'>
            <Text className='text-4xl'>42.0728</Text>
            <Text className='text-2xl text-neutral-600'>MST</Text>
          </View>
          <Text className='text-lg text-neutral-600'>Total Remote Mining</Text>
        </View>
        <View className='items-end'>
          <Text className='text-lg text-greenPrimary'>More than usual</Text>
          <Text className='text-lg text-greenPrimary'>1.023 MST</Text>
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
          <View className='rounded-xl bg-yellowPrimary p-2.5'>
            <PlayBlackIcon width={20} height={20} />
          </View>
        </View>
        <View>
          <View className='flex-row items-center rounded-full bg-bgGreen px-3 py-0.5' style={{ gap: 8 }}>
            <Text className='text-lg text-greenPrimary'>+5</Text>
            <ArrowUpBold width={10} height={10} color={colors.green} />
          </View>
        </View>
      </View>
      <View>
        <Text className='text-4xl'>24</Text>
        <Text className='mt-1 text-xl text-neutral-600'>Active Miners</Text>
      </View>
    </View>
  )
}

function TotalMiners() {
  return (
    <View className='flex-1 rounded-3xl bg-white' style={{ gap: 15, padding: 17 }}>
      <View className='flex-row items-center justify-between'>
        <View>
          <View className='rounded-xl bg-purplePrimary p-2.5'>
            <ThreeUserIcon width={20} height={20} />
          </View>
        </View>
        <View>
          <View className='flex-row items-center rounded-full bg-red-500/20 px-3 py-0.5' style={{ gap: 8 }}>
            <Text className='text-lg text-red-500'>-5</Text>
            <ArrowDownBold width={10} height={10} color={colors.red} />
          </View>
        </View>
      </View>
      <View>
        <Text className='text-4xl'>24</Text>
        <Text className='mt-1 text-xl text-neutral-600'>Active Miners</Text>
      </View>
    </View>
  )
}

function TotalLiveMining() {
  return (
    <View className='mt-5 flex-row rounded-3xl bg-white p-5' style={{ gap: 15 }}>
      <View>
        <View className='rounded-xl bg-bgGreen p-2.5'>
          <ChartIcon width={20} height={20} />
        </View>
      </View>
      <View style={{ gap: 4, flex: 1 }}>
        <View>
          <View className='flex-row items-center justify-between '>
            <Text className='text-lg text-neutral-600'>Total Live Mining</Text>
            <View className='flex-row items-center rounded-full bg-bgGreen px-3 py-0.5' style={{ gap: 7 }}>
              <Text className='text-greenPrimary' style={{ fontSize: 17 }}>
                +3.2345 MST
              </Text>
              <ArrowUpBold width={10} height={10} color={colors.green} />
            </View>
          </View>
        </View>
        <View className='mt-1 flex-row items-end gap-x-2'>
          <Text className='text-3xl'>4289192.0728</Text>
          <Text className='mb-0.5 text-xl text-neutral-600'>MST</Text>
        </View>
      </View>
    </View>
  )
}

function WalletBalance() {
  return (
    <View className='mt-5 rounded-3xl bg-yellowPrimary p-5'>
      <Text className='text-lg text-onYellow'>Wallet Balance</Text>
      <View className='mt-3 flex-row items-end'>
        <Text className='text-5xl text-onYellow'>{(6860.306).toLocaleString()}</Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.55 }}>
          <SmallButton title='Start Mining' SvgIcon={PlayIcon} />
        </View>
        <View style={{ flex: 0.45 }} className='flex-row'>
          <Text style={{ fontSize: 17 }} className='text-onYellow'>
            50 Masth
          </Text>
          <Text style={{ fontSize: 17 }} className='text-onYellow opacity-60'>
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
    <View className='mt-4 flex-row justify-between rounded-2xl bg-white p-4 px-5'>
      <View style={{ gap: 5 }} className='flex-row items-center'>
        <Text className='text-lg text-neutral-600'>MST / USD</Text>
        <Text className='text-lg'> 0.99</Text>
        <View className='p-1.5'>
          <Icon name='info' size={18} color={'gray'} />
        </View>
      </View>
      <View>
        <Text className='text-lg text-greenPrimary'>+0.08 (0.2%)</Text>
      </View>
    </View>
  )
}
