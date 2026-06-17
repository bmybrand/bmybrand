-- Run once on existing databases that already have strategy_call_bookings.
ALTER TABLE strategy_call_bookings
  ADD COLUMN ip_address VARCHAR(45) DEFAULT NULL AFTER timezone;

ALTER TABLE strategy_call_bookings
  ADD UNIQUE INDEX idx_strategy_call_ip (ip_address);
