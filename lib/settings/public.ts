// Browser-safe part of the settings: what the chat widget shows.

import { DEFAULT_SETTINGS, type AppSettings } from './schema'

// What the chat widget needs in the browser (nothing private).
export interface PublicChatConfig {
  name: string
  subtitle: string
  welcome: string
  quickReplies: string[]
  bookingEnabled: boolean
}

export function publicConfig(settings: AppSettings): PublicChatConfig {
  return {
    name: settings.assistant.name,
    subtitle: settings.assistant.subtitle,
    welcome: settings.assistant.welcome,
    quickReplies: settings.assistant.quickReplies,
    bookingEnabled: settings.booking.enabled,
  }
}

export const DEFAULT_PUBLIC_CONFIG: PublicChatConfig = publicConfig(DEFAULT_SETTINGS)
