import { useEffect } from "react"
import { Platform } from "react-native"

/**
 * Sets the browser tab title and meta description on web so each page is
 * identifiable in search results and to procurement staff. No-op on native.
 */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    if (Platform.OS !== "web" || typeof document === "undefined") return
    document.title = title
    if (!description) return
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement("meta")
      tag.setAttribute("name", "description")
      document.head.appendChild(tag)
    }
    tag.setAttribute("content", description)
  }, [title, description])
}
