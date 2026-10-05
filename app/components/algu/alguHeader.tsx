import { useRef, useState } from "react"
import { Linking, Pressable, View, useWindowDimensions } from "react-native"

import { Text } from "@/components/Text"
import { GOV_PROFILE } from "@/content/alguContent"
import { DETAIL_GROUPS, detailRoute } from "@/content/alguDetailPages"
import { useAppTheme } from "@/theme/context"
import { algu } from "@/theme/alguPalette"

import { AlguLogo } from "./alguLogo"

export interface alguHeaderProps {
  onMenuPress: () => void
  onNavigate: (route: string) => void
  currentRoute: string
}

type Item = { label: string; route?: string; action?: "capabilities" | "email" }
type Group = { title: string; sub: string; icon: string; items: Item[] }
type Menu = { key: string; label: string; promo?: string; items?: Item[]; groups?: Group[] }

const group = (id: string): Item[] =>
  DETAIL_GROUPS.find((g) => g.id === id)!.items.map((i) => ({ label: i.title, route: detailRoute(id, i.title) }))

const MENUS: Menu[] = [
  { key: "government", label: "Government", items: group("government") },
  {
    key: "services",
    label: "Services",
    groups: [
      { title: "Quantum Services", sub: "Engineered for mission outcomes.", icon: "◇", items: group("services") },
      { title: "Products & Hardware", sub: "QPUs, cryogenics, and power.", icon: "▣", items: group("products") },
      {
        title: "Government Contracting",
        sub: "Find our contract fit.",
        icon: "☆",
        items: [{ label: "Capabilities Statement (PDF)", action: "capabilities" }, ...group("contracting")],
      },
    ],
  },
  { key: "industries", label: "Industries", promo: "Serving government and enterprise missions.", items: group("industries") },
  { key: "technologies", label: "Technologies", promo: "The stack behind every engagement, from algorithms to cryogenics.", items: group("technologies") },
  {
    key: "company",
    label: "Company",
    items: [
      { label: "About ALGU Co.", route: "alguAbout" },
      { label: "Leadership", route: "alguLeadership" },
      { label: "Corporate Governance", route: "alguGovernance" },
      { label: "Case Studies", route: "alguCaseStudies" },
      { label: "Whitepapers", route: "alguWhitepapers" },
      { label: "Newsroom", route: "alguNewsroom" },
      { label: "Careers", route: "alguCareers" },
      { label: "Legal", route: "alguLegal" },
      { label: "Contact", route: "alguContact" },
    ],
  },
]

// Web hover support (RN-web). Cast keeps native typings happy.
const hover = (onIn?: () => void, onOut?: () => void) => ({ onHoverIn: onIn, onHoverOut: onOut }) as object

export function AlguHeader({ onMenuPress, onNavigate, currentRoute }: alguHeaderProps) {
  const { theme } = useAppTheme()
  const { spacing } = theme
  const { width } = useWindowDimensions()
  const isWide = width >= 860
  const [open, setOpen] = useState<string | null>(null)
  const [side, setSide] = useState(0)
  const [barH, setBarH] = useState(80)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const menu = MENUS.find((m) => m.key === open)
  const activeGroup = menu?.groups?.[Math.min(side, (menu.groups?.length ?? 1) - 1)]
  const cards = activeGroup ? activeGroup.items : (menu?.items ?? [])

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimerRef.current = setTimeout(() => {
      setOpen(null)
    }, 20)
  }

  const run = (item: Item) => {
    cancelClose()
    setOpen(null)
    if (item.action === "capabilities") Linking.openURL(GOV_PROFILE.capabilitiesStatementUrl)
    else if (item.action === "email") Linking.openURL(`mailto:${GOV_PROFILE.email}`)
    else if (item.route) onNavigate(item.route)
  }
  const toggle = (key: string) => {
    cancelClose()
    setSide(0)
    setOpen((o) => (o === key ? null : key))
  }

  return (
    <Pressable accessible={false} {...hover(() => cancelClose(), () => scheduleClose())} style={{ backgroundColor: "#f4f4f4", zIndex: 30 }}>
      <View
        onLayout={(e) => setBarH(e.nativeEvent.layout.height)}
        style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md, backgroundColor: "#f4f4f4" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {!isWide ? (
              <Pressable onPress={onMenuPress} hitSlop={12} style={{ marginRight: spacing.md, padding: 4 }} accessibilityLabel="Open menu" accessibilityRole="button">
                {[0, 1, 2].map((i) => (
                  <View key={i} style={{ width: 20, height: 2, backgroundColor: algu.ink, marginBottom: i < 2 ? 4 : 0, borderRadius: 1 }} />
                ))}
              </Pressable>
            ) : null}
            <Pressable onPress={() => { setOpen(null); onNavigate("alguHome") }} accessibilityRole="button">
              <AlguLogo size={22} primaryText="ALGU" secondaryText="CO." />
            </Pressable>
          </View>

          {isWide ? (
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, flex: 3, justifyContent: "center" }}>
              {MENUS.map((m) => {
                const active = open === m.key
                return (
                  <Pressable
                    key={m.key}
                    onPress={() => toggle(m.key)}
                    {...hover(
                      () => {
                        cancelClose();
                        setSide(0);
                        setOpen(m.key)
                      },
                      () => scheduleClose(),
                    )}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: active }}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: 8,
                      borderWidth: 1.5,
                      borderColor: active ? "#1d1d1f" : "#ffffff",
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text text={m.label} style={{ color: "#1d1d1f", fontSize: 17, fontWeight: active ? "600" : "500" }} />
                    <Text text="+" style={{ color: "#1d1d1f", fontSize: 22, marginLeft: 10, lineHeight: 22 }} />
                  </Pressable>
                )
              })}
            </View>
          ) : null}

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Pressable
              onPress={() => { setOpen(null); onNavigate("alguContact") }}
              accessibilityRole="button"
              style={{ backgroundColor: "#1f56e0", borderRadius: 10, paddingVertical: 14, paddingHorizontal: 20 }}
            >
              <Text text="Contact Us" style={{ color: "#ffffff", fontSize: 17, fontWeight: "700" }} />
            </Pressable>
          </View>
        </View>
      </View>

      {isWide && menu ? (
        <View
          style={{
            position: "absolute",
            top: barH,
            left: 0,
            right: 0,
            backgroundColor: "#f4f4f4",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            paddingHorizontal: spacing.lg,
            paddingBottom: spacing.lg,
            paddingTop: spacing.xs,
            boxShadow: "0 18px 30px rgba(0,0,0,0.16)",
          }}
        >
          <View style={{ flexDirection: "row", gap: spacing.lg, maxWidth: 1760, width: "100%", alignSelf: "center" }}>
            {menu.groups ? (
              <View style={{ width: "27%", gap: 6 }}>
                {menu.groups.map((g, i) => {
                  const on = i === side
                  return (
                    <Pressable
                      key={g.title}
                      onPress={() => setSide(i)}
                      {...hover(() => { cancelClose(); setSide(i) }, () => scheduleClose())}
                      style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 10, backgroundColor: on ? "#1b1b1b" : "transparent" }}
                    >
                      <View style={{ width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: on ? "#ffffff" : "#d4d4d4", backgroundColor: on ? "transparent" : "#ffffff", alignItems: "center", justifyContent: "center" }}>
                        <Text text={g.icon} style={{ color: on ? "#ffffff" : "#1d1d1f", fontSize: 16 }} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text text={g.title} style={{ color: on ? "#ffffff" : "#1d1d1f", fontSize: 18, fontWeight: "600" }} />
                        <Text text={g.sub} style={{ color: on ? "#e8e8e8" : "#6a6a6a", fontSize: 14, marginTop: 2 }} />
                      </View>
                    </Pressable>
                  )
                })}
              </View>
            ) : null}

            {menu.promo ? (
              <View style={{ width: "22%", minWidth: 230, backgroundColor: "#ffffff", borderRadius: 10, padding: 24, justifyContent: "space-between", gap: 24 }}>
                <Text text={menu.promo} style={{ color: "#1d1d1f", fontSize: 25, lineHeight: 33 }} />
                <Pressable onPress={() => run({ label: "briefing", action: "email" })} accessibilityRole="link">
                  <Text text="Request a Capability Briefing" style={{ color: "#1d1d1f", fontSize: 16, textDecorationLine: "underline" }} />
                </Pressable>
              </View>
            ) : null}

            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", gap: 12, alignContent: "flex-start" }}>
              {cards.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => run(item)}
                  onHoverIn={() => cancelClose()}
                  onHoverOut={() => scheduleClose()}
                  accessibilityRole="link"
                  style={{ width: "32%", minHeight: 62, backgroundColor: "#ffffff", borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}
                >
                  <Text text={item.label} style={{ color: "#1d1d1f", fontSize: 17, lineHeight: 23, flex: 1 }} />
                  <Text text="↗" style={{ color: "#1d1d1f", fontSize: 22 }} />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </Pressable>
  )
}
