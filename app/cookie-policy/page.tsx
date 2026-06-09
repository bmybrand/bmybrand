import type { Metadata } from 'next'
import PolicyPage from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Cookie Policy | BmyBrand',
  description: 'Cookie policy for the BmyBrand website.',
}

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      title="Cookie Policy"
      updatedOn="June 2, 2026"
      sections={[
        {
          heading: 'What Cookies Are',
          body: [
            'Cookies are small text files stored on your device when you visit a website. They help websites remember settings, understand usage patterns, and improve performance.',
          ],
        },
        {
          heading: 'How We Use Cookies',
          body: [
            'BmyBrand may use cookies or similar technologies to support website functionality, understand traffic, and improve the overall browsing experience.',
            'These tools may help us see which pages are visited, how visitors move through the site, and where improvements are needed.',
          ],
        },
        {
          heading: 'Managing Cookies',
          body: [
            'Most browsers allow you to control or disable cookies through browser settings. Disabling cookies may affect how some website features work.',
          ],
        },
        {
          heading: 'Third-Party Cookies',
          body: [
            'Some embedded services or analytics tools may place their own cookies. Those third parties manage their cookies under their own policies and controls.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'If you have questions about cookie usage on this website, contact BmyBrand at info@bmybrand.com.',
          ],
        },
      ]}
    />
  )
}
