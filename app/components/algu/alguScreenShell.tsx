import { ReactNode, useState } from "react"
import { Platform, View, ViewStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Drawer } from "react-native-drawer-layout"

import { Screen } from "@/components/Screen"
import { algu } from "@/theme/alguPalette"

import { AlguDrawerContent } from "./alguDrawerContent"
import { AlguFooter } from "./alguFooter"
import { AlguHeader } from "./alguHeader"

export interface alguScreenShellProps {
  currentRoute: string
  onNavigate: (route: string) => void
  children: ReactNode
  contentContainerStyle?: object
}

// Sticky header for web (a standard corporate-site pattern). Native
// ScrollView doesn't support CSS position:"sticky" the way react-native-web
// does, so this only applies on web — native keeps the ordinary
// scrolls-away-with-content header, which is the expected mobile pattern.
const stickyHeaderWrapperStyle: ViewStyle =
  Platform.OS === "web"
    ? ({ position: "sticky" as never, top: 0, zIndex: 20, backgroundColor: algu.ink } as ViewStyle)
    : {}

export function AlguScreenShell({
  currentRoute,
  onNavigate: onNavigateProp,
  children,
  contentContainerStyle,
}: alguScreenShellProps) {
  const [open, setOpen] = useState(false)
  const nav = useNavigation() as unknown as { navigate: (name: string, params?: object) => void }
  // "alguDetail:<pageKey>" opens a generated detail page; anything else is a plain route name.
  const onNavigate = (route: string) => {
    if (route.startsWith("alguDetail:")) nav.navigate("alguDetail", { pageKey: route.slice("alguDetail:".length) })
    else onNavigateProp(route)
  }

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="front"
      drawerStyle={{ width: 300, backgroundColor: algu.surface }}
      renderDrawerContent={() => (
        <AlguDrawerContent onNavigate={onNavigate} onClose={() => setOpen(false)} />
      )}
    >
      <Screen
        preset="scroll"
        backgroundColor={algu.ink}
        systemBarStyle="light"
        contentContainerStyle={contentContainerStyle}
        safeAreaEdges={["top"]}
      >
        <View style={stickyHeaderWrapperStyle}>
          <AlguHeader onMenuPress={() => setOpen(true)} onNavigate={onNavigate} currentRoute={currentRoute} />
        </View>
        {children}
        <AlguFooter onNavigate={onNavigate} />
      </Screen>
    </Drawer>
  )
}
