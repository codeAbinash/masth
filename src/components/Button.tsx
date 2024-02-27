import React from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Feather'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'outline' | 'solid'
  classNames?: string
  icon?: ImageSourcePropType | string
  IconProvider?: typeof Icon
  SvgIcon?: React.FC<SvgProps>
}
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant,
  style,
  classNames,
  icon,
  IconProvider,
  SvgIcon,
  ...rest
}) => {
  const isOutline = variant === 'outline'
  const iconSize = icon || SvgIcon ? 20 : 0
  const iconColor = isOutline ? 'black' : 'white'
  const space = 10
  const bg = isOutline ? 'bg-transparent' : 'bg-black'
  const textColor = isOutline ? 'text-black' : 'text-white'
  const activeOpacity = isOutline ? 0.3 : 0.7

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      className={`flex w-full flex-row items-center justify-center rounded-2xl border-black ${bg} ${classNames}`}
      style={[{ padding: 15, borderWidth: 1.5 }, style]}
      onPress={onPress}
      {...rest}
    >
      {SvgIcon && <SvgIcon width={iconSize} height={iconSize} style={{ marginRight: space }} />}
      {IconProvider && icon ? (
        <IconProvider
          name={icon as string}
          size={iconSize}
          color={iconColor}
          style={{
            marginRight: space,
          }}
        />
      ) : (
        icon && (
          <Image
            style={{ width: iconSize, height: iconSize, marginRight: space }}
            source={icon as ImageSourcePropType}
          />
        )
      )}

      <Text className={textColor} style={{ fontSize: 17, marginRight: (10 + iconSize) / 2 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

interface SmallButtonProps extends TouchableOpacityProps {
  title: string
  classNames?: string
  icon?: ImageSourcePropType | string
  IconProvider?: typeof Icon
  SvgIcon?: React.FC<SvgProps>
}
export function SmallButton({ onPress, title, classNames, icon, IconProvider, SvgIcon, ...rest }: SmallButtonProps) {
  const iconSize = icon || SvgIcon ? 17 : 0
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`flex flex-row items-center justify-center rounded-full border-black bg-black ${classNames}`}
      style={{ padding: 10, borderWidth: 1.5 }}
      onPress={onPress}
      {...rest}
    >
      {SvgIcon && <SvgIcon width={iconSize} height={iconSize} style={{ marginRight: iconSize / 2 }} fill={'white'} />}
      {IconProvider && icon ? (
        <IconProvider name={icon as string} size={iconSize} color='white' style={{ marginRight: iconSize / 2 }} />
      ) : (
        icon && (
          <Image
            style={{ width: iconSize, height: iconSize, marginRight: iconSize / 2 }}
            source={icon as ImageSourcePropType}
          />
        )
      )}

      <Text className='text-white' style={{ fontSize: 17 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
