import { Linking, View } from "react-native"

import { Text } from "@/components/Text"
import { FOOTER } from "@/content/alguContent"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

import { AlguLogo } from "./alguLogo"

export interface alguFooterProps {
  onNavigate: (route: string) => void
}

export function AlguFooter({ onNavigate }: alguFooterProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: algu.hairline,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.xl,
        marginTop: spacing.xl,
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }}>
        {FOOTER.columns.map((column) => (
          <View key={column.heading} style={{ minWidth: 160, flexGrow: 1, flexBasis: "20%" }}>
            <Text
              text={column.heading}
              style={{
                fontFamily: typography.primary.medium,
                color: algu.text,
                fontSize: 13,
                marginBottom: spacing.sm,
              }}
            />
            {column.items.map((item) => (
              <Text
                key={item.label}
                text={item.label}
                onPress={item.route ? () => onNavigate(item.route as string) : undefined}
                style={{
                  color: item.route ? algu.textDim : algu.steel,
                  fontSize: 12.5,
                  lineHeight: 20,
                  marginBottom: 4,
                }}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={{ height: 1, backgroundColor: algu.hairline, marginVertical: spacing.lg }} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", gap: spacing.sm }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AlguLogo size={14} primaryText="ALGU" secondaryText="CO." />
        </View>
        <Text
          text={FOOTER.contactEmail}
          onPress={() => Linking.openURL(`mailto:${FOOTER.contactEmail}`)}
          style={{ color: algu.signal, fontSize: 12 }}
        />
      </View>
    </View>
  )
}
