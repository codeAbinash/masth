import { PaddingBottom } from '@components/SafePadding'
import GameZoneIconSvgOutline from '@icons/game-outline.svg'
import GameZoneIconSvg from '@icons/game.svg'
import HomeIconSvgOutline from '@icons/home-outline.svg'
import HomeIconSvg from '@icons/home.svg'
import ProfileIconSvgOutline from '@icons/profile-outline.svg'
import ProfileIconSvg from '@icons/profile.svg'
import WalletIconSvgOutline from '@icons/wallet-outline.svg'
import WalletIconSvg from '@icons/wallet.svg'
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import GameZone from './GameZone'
import HomeScreen from './Home'
import Profile from './Profile'
import Wallet from './Wallet'

function HomeIcon(props: { focused: boolean; color: string; size: number }) {
  return props.focused ? (
    <HomeIconSvg {...props} height={props.size} width={props.size} />
  ) : (
    <HomeIconSvgOutline {...props} height={props.size} width={props.size} />
  )
}

function GameZoneIcon(props: { focused: boolean; color: string; size: number }) {
  return props.focused ? (
    <GameZoneIconSvg {...props} height={props.size} width={props.size} />
  ) : (
    <GameZoneIconSvgOutline {...props} height={props.size} width={props.size} />
  )
}

function ProfileIcon(props: { focused: boolean; color: string; size: number }) {
  return props.focused ? (
    <ProfileIconSvg {...props} height={props.size} width={props.size} />
  ) : (
    <ProfileIconSvgOutline {...props} height={props.size} width={props.size} />
  )
}

function WalletIcon(props: { focused: boolean; color: string; size: number }) {
  return props.focused ? (
    <WalletIconSvg {...props} height={props.size} width={props.size} />
  ) : (
    <WalletIconSvgOutline {...props} height={props.size} width={props.size} />
  )
}
const Tab = createBottomTabNavigator()

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className='bg-white'>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          // const label =
          //   options.tabBarLabel !== undefined
          //     ? options.tabBarLabel
          //     : options.title !== undefined
          //       ? options.title
          //       : route.name
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

          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.6}
              accessibilityRole='button'
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className='flex items-center justify-center p-1'
              style={{ flex: 1, paddingTop: 17, paddingBottom: 17 }}
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: 'black', size: 24 })}
              {/* <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label as ReactNode}</Text> */}
            </TouchableOpacity>
          )
        })}
      </View>
      <PaddingBottom />
    </View>
  )
}

const Home = () => {
  return (
    <Tab.Navigator tabBar={MyTabBar}>
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: 'HomeScreen',
          headerShown: false,
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name='Wallet'
        component={Wallet}
        options={{
          tabBarLabel: 'Wallet',
          headerShown: false,
          tabBarIcon: WalletIcon,
        }}
      />
      <Tab.Screen
        name='GameZone'
        component={GameZone}
        options={{
          tabBarLabel: 'GameZone',
          headerShown: false,
          tabBarIcon: GameZoneIcon,
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  )
}

export default Home
