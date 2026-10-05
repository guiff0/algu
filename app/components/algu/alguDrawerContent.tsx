import { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { Text } from "@/components/Text"
import { PAGES, TOP_NAV } from "@/content/alguContent"
import { DETAIL_GROUPS, detailRoute } from "@/content/alguDetailPages"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

import { AlguFoldableMenu } from "./alguFoldableMenu"
import { AlguLogo } from "./alguLogo"

export interface alguDrawerContentProps {
  onNavigate: (route: string) => void
  onClose: () => void
}

export function AlguDrawerContent({ onNavigate, onClose }: alguDrawerContentProps) {
  const { theme } = useAppTheme()
  const { spacing, typography } = theme
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const go = (route: string) => {
    onNavigate(route)
    onClose()
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: algu.surface }}
      contentContainerStyle={{ paddingVertical: spacing.xl, paddingHorizontal: spacing.lg }}
    >
      <AlguLogo size={24} style={{ marginBottom: spacing.lg }} />

      <Text
        text="MENU"
        style={{
          fontFamily: typography.primary.medium,
          color: algu.steel,
          fontSize: 11,
          letterSpacing: 2,
          marginBottom: spacing.sm,
        }}
      />
      {TOP_NAV.map((item) =>
        item.route === "alguLearn" ? (
          <AlguFoldableMenu
            key={item.route}
            label={item.label}
            sections={PAGES.learn.sections}
            onSelect={() => go(item.route)}
          />
        ) : (
          <Pressable key={item.route} onPress={() => go(item.route)} style={{ paddingVertical: 10 }}>
            <Text text={item.label} style={{ color: algu.text, fontSize: 15 }} />
          </Pressable>
        ),
      )}

      <View style={{ height: 1, backgroundColor: algu.hairline, marginVertical: spacing.lg }} />

      <Text
        text="ALL PAGES"
        style={{ fontFamily: typography.primary.medium, color: algu.steel, fontSize: 11, letterSpacing: 2, marginBottom: spacing.sm }}
      />
      {DETAIL_GROUPS.map((g) => (
        <View key={g.id}>
          <Pressable
            onPress={() => setOpenGroup(openGroup === g.id ? null : g.id)}
            accessibilityRole="button"
            accessibilityState={{ expanded: openGroup === g.id }}
            style={{ paddingVertical: 10, flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text text={g.label} style={{ color: algu.text, fontSize: 14.5, fontWeight: "600" }} />
            <Text text={openGroup === g.id ? "−" : "+"} style={{ color: algu.text, fontSize: 18 }} />
          </Pressable>
          {openGroup === g.id
            ? g.items.map((i) => (
                <Pressable key={i.title} onPress={() => go(detailRoute(g.id, i.title))} style={{ paddingVertical: 8, paddingLeft: 12 }}>
                  <Text text={i.title} style={{ color: algu.textDim, fontSize: 13.5 }} />
                </Pressable>
              ))
            : null}
        </View>
      ))}
    </ScrollView>
  )
}
