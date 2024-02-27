import {PaddingTop} from '@components/SafePadding'
import SmallProfile, {RightSideSmallProfile} from '@components/SmallProfile'
import NewsFeedImage from '@images/feeds.svg'
import {colors} from '@utils/colors'
import {StackNav} from '@utils/types'
import {Dimensions, Text, View} from 'react-native'

const {width} = Dimensions.get('window')

export default function Home({navigation}: {navigation: StackNav}) {
  return (
    <>
      <View style={{backgroundColor: colors.bgSecondary, flex: 1}} className='p-5'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
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
      </View>
    </>
  )
}
