// Test chats from the CRM's test environment. The CRM's Test chat page
// creates a short-lived ticket for a developer and opens /chat-test with it;
// chats started with a valid ticket are saved as tests (chat_sessions.is_test),
// so they and their leads only show up for developers in the CRM.

import { supabaseAdmin } from '@/lib/supabase/server'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export interface Tester {
  agentId: string
  email: string
}

// The developer a ticket belongs to, or null when the ticket is missing,
// expired, or its owner is no longer an active developer.
export async function testerForTicket(ticket: unknown): Promise<Tester | null> {
  if (typeof ticket !== 'string' || !UUID.test(ticket)) return null

  const { data, error } = await supabaseAdmin
    .from('chat_test_tickets')
    .select('agent_id, agents!inner(email, role, is_active)')
    .eq('id', ticket)
    .gt('expires_at', new Date().toISOString())
    .maybeSingle()
  if (error) {
    console.error('[chat] test ticket lookup failed', { error: error.message })
    return null
  }

  const agent = (Array.isArray(data?.agents) ? data.agents[0] : data?.agents) as
    | { email: string; role: string; is_active: boolean }
    | undefined
  if (!data || !agent?.is_active || agent.role !== 'developer') return null
  return { agentId: data.agent_id, email: agent.email }
}
