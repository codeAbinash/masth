import icons from '@assets/icons/icons'
import { View, Image, Dimensions } from 'react-native'
import QRCodeStyled, { GradientProps, useQRCodeData } from 'react-native-qrcode-styled'
const { width } = Dimensions.get('window')

export default function QR_CODE({ str }: { str: string }) {
  const data = useQRCodeData(str, {})
  const pixelSize = (width * 0.8 - 75) / data.qrCodeSize
  const iconSize = width * 0.15
  const innerBorderRadius = (1 / data.qrCodeSize) * 200
  return (
    <View className='flex items-center justify-center'>
      <Image
        source={icons.appIcon}
        className='border'
        style={{ width: iconSize, height: iconSize, position: 'absolute', zIndex: 1, borderRadius: 15 }}
      />
      <QRCodeStyled
        data={str}
        isPiecesGlued={true}
        gradient={
          {
            type: 'linear',
            options: {
              colors: ['#2aa3ce', '#466cef'],
              start: [0, 0],
              end: [1, 1],
            },
          } as GradientProps
        }
        pieceSize={pixelSize}
        pieceScale={1.03} // fix small gap between pieces
        innerEyesOptions={{ borderRadius: innerBorderRadius }}
        outerEyesOptions={{ borderRadius: innerBorderRadius * 2 }}
        pieceBorderRadius={innerBorderRadius * 0.5}
      />
    </View>
  )
}
