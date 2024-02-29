import { Image, ImageSourcePropType, TextInput, TextInputProps, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Feather'

interface InputProps extends TextInputProps {
  className?: string
  icon?: ImageSourcePropType | string
  IconProvider?: typeof Icon
  SvgIcon?: React.FC<SvgProps>
  RightUI?: React.FC
}

export const Input: React.FC<InputProps> = ({
  onTextInput,
  icon,
  IconProvider,
  placeholder = 'Sample Placeholder',
  style,
  className,
  SvgIcon,
  RightUI,
  ...rest
}) => {
  const iconSize = icon || SvgIcon ? 17 : 0
  return (
    <View
      className={`flex flex-shrink flex-row items-center justify-center rounded-2xl border-neutral-300 bg-neutral-100 ${className}`}
      style={[{ borderWidth: 1.5, paddingVertical: 1, paddingLeft: 15, paddingRight: 10 }, style]}
    >
      {SvgIcon && <SvgIcon width={iconSize} height={iconSize} style={{ marginRight: 10 }} />}
      {IconProvider && icon ? (
        <IconProvider
          name={icon as string}
          size={iconSize}
          color='black'
          style={{
            marginRight: 10,
          }}
        />
      ) : (
        icon && (
          <Image style={{ width: iconSize, height: iconSize, marginRight: 10 }} source={icon as ImageSourcePropType} />
        )
      )}
      <TextInput
        placeholder={placeholder}
        className='flex-1 border-none border-transparent outline-none'
        style={{ fontSize: 16 }}
        onTextInput={onTextInput}
        {...rest}
      />
      {RightUI && <RightUI />}
    </View>
  )
}
