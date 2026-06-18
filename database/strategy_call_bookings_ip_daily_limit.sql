-- Run once if you previously added the permanent unique IP index.
-- Allows the same IP to submit again after 24 hours.

ALTER TABLE strategy_call_bookings
  DROP INDEX idx_strategy_call_ip;

ALTER TABLE strategy_call_bookings
  ADD INDEX idx_strategy_call_ip_created (ip_address, created_at);
