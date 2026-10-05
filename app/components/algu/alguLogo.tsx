import { View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

export interface alguLogoProps {
  size?: number
  showWordmark?: boolean
  style?: ViewStyle
  primaryText?: string
  secondaryText?: string
}

/**
 * The algu mark: a nested diamond — an outer signal-blue diamond with an
 * inner ink-colored diamond cut into one corner, suggesting a chip corner /
 * cut edge (the "edge" in algu). Built entirely from rotated Views so it
 * needs no SVG library and renders identically on native and web.
 */
export function AlguLogo({
  size = 22,
  showWordmark = true,
  style,
  primaryText = "ALGU",
  secondaryText = "CO.",
}: alguLogoProps) {
  const { theme } = useAppTheme()
  const { typography } = theme
  const inner = size * 0.5

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: algu.signal,
          borderRadius: 3,
          transform: [{ rotate: "45deg" }],
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: inner,
            height: inner,
            backgroundColor: algu.ink,
            borderRadius: 1,
            position: "absolute",
            top: -inner / 2,
            left: -inner / 2,
          }}
        />
        <View
          style={{
            width: inner * 0.6,
            height: inner * 0.6,
            backgroundColor: algu.teal,
            borderRadius: 1,
            position: "absolute",
            bottom: -inner * 0.3,
            right: -inner * 0.3,
          }}
        />
      </View>

      {showWordmark ? (
        <View style={{ flexDirection: "row", alignItems: "baseline", marginLeft: size * 0.5 }}>
          <Text
            text={primaryText}
            style={{
              fontFamily: typography.primary.bold,
              color: algu.text,
              fontSize: size * 0.78,
              letterSpacing: 3,
            }}
          />
          <Text
            text={secondaryText}
            style={{
              fontFamily: typography.primary.medium,
              color: algu.steel,
              fontSize: size * 0.42,
              letterSpacing: 2,
              marginLeft: 6,
            }}
          />
        </View>
      ) : null}
    </View>
  )
}
