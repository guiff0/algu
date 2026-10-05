import { Image, ImageStyle, StyleProp } from "react-native"

export interface alguLogoImageProps {
  size?: number
  style?: StyleProp<ImageStyle>
}

/**
 * The full illustrated algu/ALGU Co. logo artwork. Used prominently (hero,
 * login/signup) where its detail reads well. The small header/drawer/footer
 * chrome keeps using the simpler vector `AlguLogo` mark instead — the
 * illustrated version is too detailed to stay crisp at 20px.
 */
export function alguLogoImage({ size = 160, style }: alguLogoImageProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    <Image
      source={require("../../../assets/images/algu-logo.png")}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
      accessibilityLabel="algu, an ALGU Co. company, logo"
    />
  )
}
