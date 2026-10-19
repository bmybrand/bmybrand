type Recaptcha = {
  ready: (callback: () => void) => void
  execute: (
    siteKeyOrWidgetId: string | number,
    options: { action: string }
  ) => Promise<string>
  render: (
    container: string | HTMLElement,
    parameters: {
      sitekey: string
      size: 'invisible'
      badge: 'bottomleft' | 'bottomright' | 'inline'
    }
  ) => number
}

interface Window {
  grecaptcha?: Recaptcha
}
