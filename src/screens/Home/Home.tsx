import {PaddingTop} from '@components/SafePadding'
import SmallProfile, {RightSideSmallProfile} from '@components/SmallProfile'
import {colors} from '@utils/colors'
import {StackNav} from '@utils/types'
import {View} from 'react-native'

export default function Home({navigation}: {navigation: StackNav}) {
  return (
    <>
      <View style={{backgroundColor: colors.bgSecondary, flex: 1}} className='p-5'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
      </View>
    </>
  )
}
