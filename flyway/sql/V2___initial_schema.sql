INSERT INTO events (title, event_description, options, event_date, registration_starts, event_location) VALUES ('One_Event_TM', 'First event!', 'alcohol-free event', '2023-11-23 09:00:00', '2023-11-15 09:00:00', 'Maarintie 8');

INSERT INTO events (title, event_description, event_date, registration_starts, event_location) VALUES ('TWO_Event_TM', 'Second event!', '2023-11-15 09:00:00', '2023-11-13 14:00:00', 'JMT 5');

INSERT INTO event_registrations (events_id, participant_name, email) VALUES (2, 'John Doe', 'john.doe@email.com')