-- Chat leads are created only once the visitor has actually shared contact
-- details through the chat contact form. The old trigger also fired when the
-- bot merely started asking for a name (pending_intent), which filled the CRM
-- with empty leads, and it used internal state names as the "interest".
--
-- Supersedes the chat trigger in chatbot-dashboard/supabase/migrations/03_leads_crm.sql.

CREATE OR REPLACE FUNCTION public.sync_lead_from_chat()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.crm_leads
    (source, source_table, source_ref, name, email, phone, interest, message, status, action_required, last_activity_at)
  VALUES
    ('chat', 'chat_sessions', NEW.id::text, NEW.visitor_name, NEW.visitor_email, NEW.visitor_phone,
     COALESCE(NULLIF(NEW.metadata->>'lead_interest', ''), 'Chatbot inquiry'),
     NULLIF(NEW.metadata->>'lead_message', ''),
     'new', true, now())
  ON CONFLICT (source, source_ref) DO UPDATE SET
    name     = COALESCE(EXCLUDED.name, crm_leads.name),
    email    = COALESCE(EXCLUDED.email, crm_leads.email),
    phone    = COALESCE(EXCLUDED.phone, crm_leads.phone),
    interest = COALESCE(EXCLUDED.interest, crm_leads.interest),
    message  = COALESCE(EXCLUDED.message, crm_leads.message),
    -- A repeat submission is a new request for the team to act on.
    action_required = true,
    last_activity_at = now();
  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS trg_sync_lead_from_chat ON public.chat_sessions;

CREATE TRIGGER trg_sync_lead_from_chat
  AFTER UPDATE ON public.chat_sessions
  FOR EACH ROW
  WHEN (
    (NEW.visitor_email IS NOT NULL OR NEW.visitor_phone IS NOT NULL)
    AND (
      OLD.visitor_email IS DISTINCT FROM NEW.visitor_email
      OR OLD.visitor_phone IS DISTINCT FROM NEW.visitor_phone
      OR (OLD.metadata->>'lead_submitted_at') IS DISTINCT FROM (NEW.metadata->>'lead_submitted_at')
    )
  )
  EXECUTE FUNCTION public.sync_lead_from_chat();
