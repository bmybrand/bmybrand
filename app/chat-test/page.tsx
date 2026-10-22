import type { Metadata } from 'next'
import TestChat from './TestChat'

export const metadata: Metadata = {
  title: 'Test chat | BmyBrand',
  robots: { index: false, follow: false },
}

// The live chatbot for the CRM's test environment. The CRM's Test chat page
// shows this page in a frame with a ticket; chats here are saved as tests.
export default async function ChatTestPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket?: string | string[] }>
}) {
  const { ticket } = await searchParams
  const testTicket = typeof ticket === 'string' ? ticket : undefined

  if (!testTicket) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-[#11122F] p-6 text-center text-base text-[#ADAECC]">
        Open this page from the CRM&apos;s Test chat.
      </main>
    )
  }

  return <TestChat testTicket={testTicket} />
}
