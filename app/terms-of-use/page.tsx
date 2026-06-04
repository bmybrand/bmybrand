import type { Metadata } from 'next'
import PolicyPage from '@/components/policy-page'

export const metadata: Metadata = {
  title: 'Terms Of Use | BmyBrand',
  description: 'Terms of use for BmyBrand website visitors and clients.',
}

export default function TermsOfUsePage() {
  return (
    <PolicyPage
      title="Terms Of Use"
      updatedOn="June 2, 2026"
      sections={[
        {
          heading: 'Terms Of Use',
          body: [
            'Welcome to B My Brand LLC. By signing up with us and becoming a client, you agree to be legally bound by these Terms and Conditions of Use, including any terms incorporated by reference. Please read these Terms and Conditions carefully. If you do not accept them, you may not use our services.',
            'B My Brand LLC may revise these Terms and Conditions at any time by updating this page. You should review this page periodically. In these Terms and Conditions, all services provided by and related to B My Brand LLC, and all text, images, photographs, user interface, look and feel, data, and other content included by B My Brand LLC from time to time, are referred to as the Website and/or Service.',
            'You acknowledge and agree that B My Brand LLC has the right, but not the obligation, in its sole discretion, to pre-screen, refuse, or remove any project or user-provided content that violates these Terms and Conditions or is otherwise objectionable, including content that is illegal, obscene, indecent, defamatory, incites religious, racial, or ethnic hatred, or violates the rights of others.',
            'You acknowledge, consent, and agree that B My Brand LLC may access, preserve, and disclose your account information and content if required by law or if reasonably necessary to comply with legal process, enforce these Terms and Conditions, respond to claims, provide customer service, or protect the rights, property, or personal safety of B My Brand LLC, its users, or the public.',
            'B My Brand LLC reserves the right to modify, amend, update, suspend, or discontinue these Terms and Conditions and the Service at any time. You acknowledge and agree that B My Brand LLC shall not be liable to you or any third party for such changes.',
          ],
        },
        {
          heading: 'B My Brand LLC Technicalities',
          body: [
            'Description. The B My Brand LLC Service is an online offering where individuals or entities that sign up as clients can post specific assignments and project descriptions, including samples or media, known as Creative Briefs. Clients may revise those briefs through Revision Briefs and obtain Responses from design experts retained by B My Brand LLC. The Service is provided according to the package selected by the client, and the process is iterative until a final response is produced.',
            'Creative Briefs and Responses. You are solely responsible for preparing and posting detailed descriptions of each Creative Brief, including any supporting samples and deadlines. A Term Sheet may be generated for each requested Response. B My Brand LLC is under no obligation to review a Creative Brief, Revision Brief, or Term Sheet for accuracy, completeness, quality, or clarity, and may deny any submission in its sole discretion.',
            'Reviewing Responses. When B My Brand LLC provides a Response, you are responsible for reviewing it promptly. If you do not promptly notify B My Brand LLC that the Response is not reasonably responsive to the related Term Sheet or Creative Brief, the Response will be deemed accepted. If you request changes, you must submit a Revision Brief describing the amendments required.',
            'Revision Cycles. Revision cycles generally consist of 2 to 6 additional compositions that incorporate requested changes. Significant changes may be requested in the first and second cycles. By the third revision request, requested changes should be modifications to the current composition only.',
          ],
        },
        {
          heading: 'Eligibility, Access, Use And Service',
          body: [
            'Eligibility Requirements. To register as a client, you must be at least 18 years of age, agree to these Terms and Conditions and the B My Brand LLC Privacy Policy, and complete the registration procedure. By registering, you represent and warrant that the information you provide is complete and accurate and, if registering on behalf of an entity, that you are authorized to bind that entity.',
            'Authorization to Use; Permitted Uses. You may access and use the Service solely in accordance with these Terms and Conditions and any posted policies. You may provide Creative Briefs and obtain Responses only if you register as a client. Subject to these Terms, you may display the Website on an internet access device and may occasionally print insubstantial portions of the Website where that use qualifies as fair use under United States copyright law.',
            'Prohibited Uses. Except as expressly permitted, you may not broadcast, circulate, distribute, download, perform, publish, rent, reproduce, sell, store, transmit, or create derivative or decorative works from the Website. You also agree not to post content that is unlawful, infringing, defamatory, threatening, abusive, sexually explicit, promotional, fraudulent, or harmful, or that contains malware, viruses, worms, or similar malicious code.',
            'You further agree not to use false registration information, interfere with the Website infrastructure, attempt unauthorized access, use automated scraping or search tools outside generally available browsers, or attempt to decipher, decompile, disassemble, or reverse-engineer any part of the Website.',
            'Website Security. You are prohibited from violating or attempting to violate the security of the Website, including unauthorized access, vulnerability testing without authorization, service interference, spam, or forging packet headers. B My Brand LLC may investigate such activities and cooperate with law enforcement where appropriate.',
            'Operation of Website. B My Brand LLC shall not be responsible for delays, interruptions, errors, omissions, or temporary unavailability of the Website or Service. B My Brand LLC may discontinue the Website in whole or in part, change transmission methods, or change signal characteristics at any time.',
          ],
        },
        {
          heading: 'Refund, Cancellation And Tax Policy',
          body: [
            'The B My Brand LLC refund policy will be void if you have chosen a special package, approved the primary design concept, demanded revisions, cancelled for reasons unrelated to the company, remained inactive for more than 2 weeks on a project, violated company policies, approached another company or designer for the same project, provided an incomplete creative brief, demanded a complete design change, submitted a claim outside the allowed refund request period, or closed or changed your business.',
            'Reasons such as change of mind, disagreement with a partner, or other issues not related to the service are not eligible for refund. If a client subscribes to a service bundle and is dissatisfied with only one service, any refund applies only to that service and not the entire bundle.',
            'The client is not entitled to refunds after 7 days from the date of purchase. Services including but not limited to social media, SEO, domain registration, and web hosting are not refundable under any circumstances. For websites, refunds will not be entertained once the client has approved the design and the website has moved to development.',
            'A customer is not eligible for a refund after 24 hours once the contract has been sent to the client for signature. If the contract is not signed within 48 hours, the customer is not eligible for a refund without a valid reason. Printed orders cannot be refunded once the item is in production or delivery. Cancellation of a printing order must occur before printing begins.',
            'After a refund, you will not have any right to use the designs for any purpose, and all such designs will remain the sole property of B My Brand LLC. B My Brand LLC reserves the right to reject any project or cancel any contract whenever it deems necessary.',
            'All communication between the B My Brand LLC team and the customer should be documented on the registered email address provided by the customer. For order delivery, the company shall attempt contact through the customer email address at least three times. If there is no response after three emails and seven consecutive working days from delivery, the project will be deemed accepted and no refund will be due. If the customer is non-responsive on the registered email address for 10 consecutive days, any money-back guarantee becomes void.',
            'Payments made by Visa, MasterCard, and American Express are processed by merchant banking services. B My Brand LLC does not hold customer card details on its own systems. Recurring billing details may be stored by merchant services. We also accept payment via cheque, bank transfer, and PayPal. All prices advertised on this website are exclusive of any applicable taxes.',
          ],
        },
        {
          heading: 'Important Information',
          body: [
            'How do I qualify to claim a refund? When you receive initial design concepts for your design package and do not find them according to your brief, you may choose to claim a refund, subject to the conditions stated in this document.',
            'How long does it take to claim a refund? It can take up to 21 business days to process a refund. Our refund policy is governed by these Terms and Conditions of business.',
            'Does the money-back guarantee apply to all packages? Money Back Guarantee applies to design packages only. Once you approve a design and ask for further revisions, the Money Back Guarantee becomes void. However, you may still qualify for a satisfaction-based revision process.',
            'Why does B My Brand LLC provide a Money Back Guarantee? We are confident in our skills and design quality and provide the guarantee in good faith if we fail to deliver. However, the guarantee does not apply to abusive or unfair conduct, such as placing the same order with multiple providers and requesting refunds after receiving design concepts.',
            'Design work is subjective and depends heavily on quality customer feedback. Initial samples are often used to explore directions, and revisions are based on your feedback to move closer to the final result. Money Back Guarantee is intended to protect customers if we fail to deliver what was requested.',
            'Money Back Guarantee does not apply to design agencies, design studios, or those working on their own client projects. Customers claiming a refund are not allowed to use the initial design concepts sent to them. Copyrights of all designs remain the property of B My Brand LLC until fully paid.',
          ],
        },
        {
          heading: 'Ownership And Rights To Use',
          body: [
            'Website and Service Generally. Except as expressly stated in these Terms, as between B My Brand LLC and you, B My Brand LLC owns all right, title, and interest in and to all copyright, trademark, service mark, patent, trade secret, and other intellectual property rights in the Website and Service. You may not remove, conceal, or alter any copyright notice, disclaimer, restriction, or other notice on the Website.',
            'Creative and Response Briefs. Upon submission of a Creative Brief, Revision Brief, or any other client information, B My Brand LLC and its agents shall have the rights necessary to use such information for the purpose of obtaining Responses and for archival purposes. Members assigned to your project may review and display the relevant Term Sheet for purposes of preparing a Response.',
            'Rights of B My Brand LLC. Upon submission of client information, you grant B My Brand LLC and its agents a royalty-free, perpetual, irrevocable, sublicensable, exclusive, worldwide right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, communicate, perform, display, and incorporate that information as necessary to provide the Service and Responses.',
            'Rights of Clients. Subject to your compliance with these Terms and Conditions, you shall own the final Response composition provided to you, referred to as the Final Product. You do not own preliminary materials, revision-stage content, unselected concepts, or other non-final materials. B My Brand LLC retains all rights to those materials and may use Creative Briefs, Revision Briefs, individual Responses, and Final Products for internal, archival, display, and promotional purposes.',
            'B My Brand LLC has no obligation to perform trademark, service mark, or copyright searches regarding the Final Product, and you are encouraged to conduct your own independent searches. B My Brand LLC has no responsibility to assist you in seeking trademark or copyright registration. B My Brand LLC also reserves the right to charge your account for release of final files and may bill your account for release of website domains or master files where applicable.',
          ],
        },
        {
          heading: 'Non-Disclosure And Privacy',
          body: [
            'B My Brand LLC intends to use commercially reasonable efforts to follow its Privacy Policy, as that policy may be changed from time to time at its sole discretion. Notwithstanding the foregoing, B My Brand LLC cannot and does not assume responsibility or liability for any information submitted to the Website or for the use or misuse of any information submitted by you or any other person, including information accessed by a hacker or through any other malicious act.',
          ],
        },
        {
          heading: 'Warranty Disclaimers, Indemnification And Limitations Of Liability',
          body: [
            'Responsibility for Content. B My Brand LLC shall not be responsible for any use or non-use of the Website or Service. B My Brand LLC makes no representations, warranties, or guarantees regarding the truthfulness, accuracy, or reliability of any material communicated through or posted to the Service, including Creative Briefs, Term Sheets, Responses, user identities, or linked content. Any reliance on such material is at your own risk.',
            'Links to Third-Party Services. The Website may contain links to third-party websites or services. Such linked content is not under the control of B My Brand LLC, and B My Brand LLC is not responsible for it. Inclusion of linked content does not imply endorsement, and any access is at your own risk.',
            'Disclaimer of Warranties. The Service and the Responses are provided as is. B My Brand LLC disclaims, to the maximum extent permitted by law, all express and implied warranties, including warranties of merchantability, fitness for a particular purpose, non-infringement, uninterrupted availability, and freedom from delays, interruptions, errors, or omissions.',
            'Release from Claims. Because B My Brand LLC cannot fully verify every client or user and cannot control all participant behavior, if you have a dispute with one or more users, you release B My Brand LLC, its affiliates, agents, and employees from claims, demands, and damages of every kind arising out of or connected with such disputes.',
            'Indemnification. You agree to defend, indemnify, and hold harmless B My Brand LLC and its affiliates, officers, agents, partners, and employees from any action, claim, demand, or liability arising from or relating to your violation of these Terms and Conditions or your use of the Website, including reasonable attorneys fees.',
            'Limitation of Damages. In no event shall B My Brand LLC or any third party be liable to you or any other person for consequential, incidental, special, exemplary, punitive, or indirect damages arising under or in any way related to the Website, the Service, or these Terms and Conditions, including lost profits, loss of business, data loss, business interruption, or delay-related damages, even if advised of the possibility of such damages. Total liability shall be limited to the total amount you paid to B My Brand LLC for your package. These Terms and Conditions shall be governed by and construed in accordance with the laws of the United States.',
          ],
        },
        {
          heading: 'Contact',
          body: [
            'If you have questions about these Terms Of Use, contact B My Brand LLC at info@bmybrand.com.',
          ],
        },
      ]}
    />
  )
}
