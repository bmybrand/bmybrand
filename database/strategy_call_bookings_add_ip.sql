-- Run once on existing databases that already have strategy_call_bookings.
ALTER TABLE strategy_call_bookings
  ADD COLUMN ip_address VARCHAR(45) DEFAULT NULL AFTER timezone;

-- If you added the old permanent unique IP index, remove it:
-- ALTER TABLE strategy_call_bookings DROP INDEX idx_strategy_call_ip;

ALTER TABLE strategy_call_bookings
  ADD INDEX idx_strategy_call_ip_created (ip_address, created_at);
