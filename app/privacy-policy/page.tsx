import type { Metadata } from 'next'
import PolicyPage from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Privacy Policy | BMYBrand',
  description: 'Privacy policy for BMYBrand website visitors and leads.',
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      updatedOn="June 2, 2026"
      sections={[
        {
          heading: 'Overview',
          body: [
            'We at BMYBrand, accessible from https://bmybrand.com/, consider the privacy of our visitors one of our main priorities. This Privacy Policy explains the types of information that are collected and recorded by BMYBrand and how we use it.',
            'This Privacy Policy applies only to our online activities and is valid for both website visitors and clients with regard to information they share and/or that is collected through the website. It does not apply to information collected offline or through channels other than this website.',
          ],
        },
        {
          heading: 'Consent',
          body: [
            'By using our website, you consent to this Privacy Policy and agree to its terms.',
          ],
        },
        {
          heading: 'Information We Collect',
          body: [
            'The personal information you are asked to provide, and the reasons why you are asked to provide it, will be made clear at the point we request it.',
            'If you contact us directly, we may receive additional information such as your name, email address, phone number, the contents of your message or attachments, and any other information you choose to provide.',
            'When you register for an account, we may ask for contact information including your name, company name, address, email address, and telephone number for verification purposes. Additional services may require bank details as well. Certain behavior patterns, such as how you use the website, may also be collected automatically through cookies and IP logging.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'We use collected information to improve, personalize, and expand our website features and services based on user patterns and experience.',
            'We may use your information to communicate with you directly or through partners for customer service, updates, and service-related communication. Your email address and certain personal information may also be used for marketing and promotional purposes, and you may opt out of those emails if you choose.',
            'Information collected through cookies may be used by Google for storage and analysis purposes. We use encrypted systems to help protect your data. We do not share your information with third parties for general use, though we may share it where required for legal matters or fraud prevention.',
          ],
        },
        {
          heading: 'Log Files, Cookies, And Third Parties',
          body: [
            'BMYBrand follows a standard procedure of using log files. These files may record IP addresses, browser type, ISP, date and time stamp, referring or exit pages, and click counts. This information is not linked to personally identifiable information and is used for analyzing trends, administering the site, tracking user movement, and gathering demographic information.',
            'Like many websites, BMYBrand uses cookies and web beacons to store visitor preferences and track visited pages in order to optimize the user experience.',
            'Google may use DART cookies to serve ads based on visits to this and other websites. Third-party ad servers or networks may also use cookies, JavaScript, or web beacons in their own advertising and links. BMYBrand has no access to or control over cookies used by third-party advertisers. You should review the privacy policies of those third parties directly.',
          ],
        },
        {
          heading: 'Your Privacy Rights',
          body: [
            'Under the CCPA, consumers may request disclosure of collected personal data, request deletion of personal data, and request transparency regarding what data has been collected. SMS opt-in data and phone numbers for SMS purposes are not being shared.',
            'Under GDPR, users may have the right to access their data, request corrections, request deletion under certain conditions, and object to processing under certain conditions. If you make a request, we have one month to respond.',
          ],
        },
        {
          heading: "Children's Information",
          body: [
            'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and monitor their children’s online activity.',
            'BMYBrand does not knowingly collect personally identifiable information from children under the age of 13. If you believe your child has provided this kind of information on our website, contact us immediately and we will use our best efforts to remove it promptly from our records.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'If you have additional questions, would like to exercise your privacy rights, or need more information about this Privacy Policy, contact BMYBrand through info@bmybrand.com.',
          ],
        },
      ]}
    />
  )
}
