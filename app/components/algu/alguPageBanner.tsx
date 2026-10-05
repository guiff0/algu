import { Image, View } from "react-native"

export type IllustrationKey =
  | "hero-reactor-core"
  | "circuit-lattice"
  | "molecular-quantum"
  | "reactor-containment"
  | "data-grid"
import { algu } from "@/theme/alguPalette"

// Static requires — Metro needs literal paths, so this lookup map (not a
// dynamic template string) is what makes runtime-selected illustrations work.
const ILLUSTRATIONS: Record<IllustrationKey, number> = {
  "hero-reactor-core": require("../../../assets/images/hero-reactor-core.png"),
  "circuit-lattice": require("../../../assets/images/circuit-lattice.png"),
  "molecular-quantum": require("../../../assets/images/molecular-quantum.png"),
  "reactor-containment": require("../../../assets/images/reactor-containment.png"),
  "data-grid": require("../../../assets/images/data-grid.png"),
}

export interface alguPageBannerProps {
  illustration: IllustrationKey
  height?: number
}

export function alguPageBanner({ illustration, height = 190 }: alguPageBannerProps) {
  return (
    <View style={{ width: "100%", height, backgroundColor: algu.ink, overflow: "hidden" }}>
      <Image source={ILLUSTRATIONS[illustration]} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
      {/* Fade the bottom edge into the page background so the banner reads as
          part of the page rather than a hard-edged photo strip. */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.55,
          backgroundColor: algu.ink,
          opacity: 0.001, // placeholder layer kept flat; real fade handled by overlay below
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.6,
          backgroundColor: algu.ink,
          opacity: 0.35,
        }}
      />
    </View>
  )
}
