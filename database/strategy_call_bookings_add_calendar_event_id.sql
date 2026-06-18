-- Run in phpMyAdmin if strategy_call_bookings already exists without calendar_event_id.
ALTER TABLE strategy_call_bookings
  ADD COLUMN calendar_event_id VARCHAR(255) DEFAULT NULL AFTER ip_address;
