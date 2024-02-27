import { SmallButton } from '@components/Button'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import LockIcon from '@icons/lock.svg'
import SwapIcon from '@icons/swap.svg'
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React from 'react'
import { Text, View, TouchableOpacity, Animated } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Tab = createMaterialTopTabNavigator()

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const inputRange = state.routes.map((_, i) => i)
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        })

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={{ opacity }}>{label as string}</Animated.Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen name='Left' component={LeftTab} />
      <Tab.Screen name='Right' component={RightTab} />
    </Tab.Navigator>
  )
}

function LeftTab() {
  return (
    <View>
      <Text>Left Tab</Text>
    </View>
  )
}

function RightTab() {
  return (
    <View>
      <Text>
        Right Tab Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum dolor eaque explicabo quos cum
        cumque tempore deserunt nostrum? Ratione nostrum nesciunt perferendis voluptas illum exercitationem minima
        praesentium, rerum expedita, repellendus quia? Earum voluptates, enim, id, expedita consequatur molestias
        voluptate cum illo pariatur commodi quae. Rerum sint delectus laboriosam dicta sequi. Recusandae delectus quidem
        minima laboriosam suscipit natus nihil perferendis numquam, temporibus nobis facilis laborum dolorum ullam
        soluta labore ratione sunt obcaecati velit placeat necessitatibus culpa! Sequi sit nulla iste voluptas cumque
        quis. Illo adipisci eum doloribus? Nostrum, nihil voluptatem dolorum doloremque obcaecati autem debitis
        reprehenderit. Odit excepturi accusantium soluta aliquid distinctio? Soluta, minima. Iusto dignissimos iste
        pariatur ipsam laboriosam ut cum architecto quibusdam facere doloribus amet quam, quasi excepturi atque illum
        molestias voluptatibus odio velit ducimus consequuntur distinctio et unde. Soluta velit enim fugit, distinctio
        tenetur magni quis! Dolores necessitatibus fuga magnam, soluta fugiat id, eveniet architecto autem deleniti
        nulla temporibus molestiae saepe error similique numquam. Pariatur, distinctio ab, illum fuga, saepe minus nulla
        obcaecati architecto veniam dicta quos culpa sed nemo itaque? Magnam commodi fugit, ad nisi asperiores laborum
        perferendis quisquam distinctio omnis dolores rerum, quas, iste numquam ea perspiciatis mollitia modi quae!
        Vitae necessitatibus nobis sed maiores eius deleniti sapiente. Ratione molestias autem non assumenda iste a fuga
        mollitia quae ab consequatur quas neque voluptatum, sit totam nesciunt blanditiis hic ea? Consectetur nostrum
        minima quae, debitis at veniam, sequi quia facere, quidem aliquam amet alias eaque totam nulla? Inventore,
        facere corrupti perferendis maiores animi nobis, totam voluptate nemo perspiciatis quis explicabo a officiis
        libero? Ipsam consequatur repellendus rerum corrupti assumenda soluta alias, pariatur ab laudantium velit
        excepturi optio, debitis ullam ea, exercitationem itaque odit possimus quos laboriosam ipsum vero aspernatur. Ab
        ipsam voluptates expedita quis autem aut nesciunt aliquid aliquam repellat eum rerum ipsa ipsum, at sed!
        Voluptates ab dolores quisquam rerum iusto quia at veritatis in quis dolore obcaecati reiciendis ullam culpa
        nisi tenetur natus, similique maiores! Voluptatibus, quia. Possimus, blanditiis aperiam molestias quia repellat
        error tempore molestiae natus et magni veritatis minus labore repudiandae accusantium consequatur beatae atque
        odio non dicta? Quidem, dolor aperiam architecto odio tempore ullam! Repellendus nesciunt omnis iure doloremque
        laboriosam voluptas at, incidunt repudiandae assumenda, facilis nostrum, consequuntur consequatur? Aperiam iusto
        ullam sapiente tenetur non nobis repellat officia quia temporibus, neque itaque quo ea, inventore iste dolor
        magnam! Ullam provident delectus quas reiciendis nam. Perspiciatis, sed vero suscipit assumenda omnis culpa
        minus corrupti error aliquid, id veritatis hic repellendus nemo odio reprehenderit! Inventore quidem debitis
        optio corrupti! Officiis blanditiis reiciendis placeat, aspernatur rem suscipit nam, eum soluta recusandae ab
        illum quibusdam excepturi dolorum nostrum quisquam. Distinctio rerum voluptatibus, voluptatem earum ea deserunt
        id architecto corrupti sequi consectetur tempore explicabo, veritatis est doloremque necessitatibus enim fuga
        perferendis rem modi? Exercitationem, facere asperiores laudantium quam sequi aliquam odit! Facilis error culpa
        nemo magnam, repellendus libero veniam inventore non assumenda, sapiente eveniet eaque nostrum sint ratione
        voluptas saepe! Consequatur similique esse pariatur, ipsum eveniet atque rem ipsam expedita sit eaque eligendi
        obcaecati, alias vel officiis.
      </Text>
    </View>
  )
}

export default function Wallet({ navigation }: { navigation: StackNav }) {
  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.bgSecondary, flex: 1 }} className='p-5'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
        <View className='mt-3 flex-row items-center justify-between'>
          <View className='flex flex-row'>
            <Text className='text-neutral-500' style={{ fontSize: 30 }}>
              Your,{' '}
            </Text>
            <Text style={{ fontSize: 30 }}>Wallet</Text>
          </View>
          <TouchableOpacity
            className='rounded-full border border-neutral-200 bg-white p-2.5'
            onPress={() => navigation.navigate('Transactions')}
          >
            <SwapIcon height={18} width={18} />
          </TouchableOpacity>
        </View>
        <View>
          <WalletBalance />
        </View>
        <View
        // style={{
        //   // marginTop: 50,
        // }}
        ></View>
        <MyTabs />
      </View>
    </ScrollView>
  )
}

function WalletBalance() {
  return (
    <View className='bg-yellowPrimary mt-4 rounded-3xl p-5'>
      <Text className='text-onYellow text-lg'>Wallet Balance</Text>
      <View className='mt-3 flex-row items-end'>
        <Text className='text-onYellow text-5xl'>{(6860.306).toLocaleString()}</Text>
        <Text className='text-onYellow mb-1.5 ml-1 text-2xl'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.5 }}>
          <SmallButton title='Withdraw' SvgIcon={LockIcon} />
        </View>
        <Text style={{ flex: 0.5, fontSize: 17 }} className='text-onYellow'>
          MST/USD 0.99
        </Text>
      </View>
    </View>
  )
}
