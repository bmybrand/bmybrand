'use client'

import Script from 'next/script'
import { initializeRecaptcha } from '@/lib/recaptcha-client'

const RECAPTCHA_CONTAINER_ID = 'bmy-recaptcha'

export default function RecaptchaLoader({ siteKey }: { siteKey: string }) {
  return (
    <>
      <div id={RECAPTCHA_CONTAINER_ID} />
      <Script
        id={`google-recaptcha-${siteKey}`}
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          void initializeRecaptcha(RECAPTCHA_CONTAINER_ID)
        }}
      />
    </>
  )
}
