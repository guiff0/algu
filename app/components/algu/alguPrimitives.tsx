import { ReactNode } from "react"
import { Platform, Pressable, TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import { algu } from "@/theme/alguPalette"

export const alguMono: TextStyle = {
  fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "Courier New" }),
}

export function AlguSection({
  title,
  kicker,
  spacing,
  titleFontFamily,
  children,
}: {
  title: string
  kicker?: string
  spacing: number
  titleFontFamily: string
  children: ReactNode
}) {
  return (
    <View style={{ paddingHorizontal: spacing }}>
      {kicker ? (
        <Text text={kicker} style={[alguMono, { color: algu.signal, letterSpacing: 2, marginBottom: 6 }]} />
      ) : null}
      <Text
        text={title}
        style={{ fontFamily: titleFontFamily, color: algu.text, fontSize: 24, marginBottom: spacing }}
      />
      {children}
    </View>
  )
}

export function AlguDivider({ label, spacing }: { label: string; spacing: number }) {
  const $row: ViewStyle = { flexDirection: "row" }
  return (
    <View style={[$row, { alignItems: "center", paddingHorizontal: spacing, marginVertical: spacing }]}>
      <View style={{ flex: 1, height: 1, backgroundColor: algu.hairline }} />
      <Text
        text={label}
        style={[alguMono, { color: algu.steel, fontSize: 11, letterSpacing: 3, marginHorizontal: 12 }]}
      />
      <View style={{ flex: 1, height: 1, backgroundColor: algu.hairline }} />
    </View>
  )
}

export function AlguListRow({ text, dotColor, spacing }: { text: string; dotColor: string; spacing: number }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: spacing }}>
      <View
        style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor, marginTop: 8, marginRight: spacing }}
      />
      <Text text={text} style={{ flex: 1, color: algu.textDim, fontSize: 15, lineHeight: 22 }} />
    </View>
  )
}

export function AlguCard({
  title,
  body,
  accentColor,
  spacing,
  titleFontFamily,
  style,
}: {
  title: string
  body: string
  accentColor: string
  spacing: number
  titleFontFamily: string
  style?: ViewStyle
}) {
  return (
    <View
      style={[
        {
          flexGrow: 1,
          flexBasis: "30%",
          minWidth: 240,
          backgroundColor: algu.surface,
          borderWidth: 1,
          borderColor: algu.hairline,
          borderRadius: 10,
          padding: spacing,
        },
        style,
      ]}
    >
      <Text
        text={title}
        style={{ fontFamily: titleFontFamily, color: accentColor, fontSize: 15, marginBottom: body ? 6 : 0 }}
      />
      {body ? <Text text={body} style={{ color: algu.textDim, fontSize: 13.5, lineHeight: 20 }} /> : null}
    </View>
  )
}

export function AlguChip({
  label,
  fontFamily,
  outline,
  selected,
  onPress,
}: {
  label: string
  fontFamily: string
  outline?: boolean
  selected?: boolean
  onPress?: () => void
}) {
  const isOutline = outline && !selected
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: selected ? algu.signal : isOutline ? "transparent" : algu.surfaceRaised,
          borderWidth: isOutline ? 1 : 0,
          borderColor: algu.steel,
          borderRadius: 999,
          paddingVertical: 8,
          paddingHorizontal: 14,
        }}
      >
        <Text text={label} style={{ fontFamily, color: selected ? algu.ink : algu.text, fontSize: 13 }} />
      </View>
    </Pressable>
  )
}

export function AlguPrimaryButton({
  text,
  onPress,
  fontFamily,
  style,
  disabled,
}: {
  text: string
  onPress: () => void
  fontFamily: string
  style?: TextStyle
  disabled?: boolean
}) {
  return (
    <Text
      text={text}
      onPress={disabled ? undefined : onPress}
      style={[
        {
          alignSelf: "flex-start",
          backgroundColor: disabled ? algu.steel : algu.signal,
          color: disabled ? algu.textDim : algu.ink,
          fontFamily,
          fontSize: 14,
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 20,
          overflow: "hidden",
        },
        style,
      ]}
    />
  )
}
