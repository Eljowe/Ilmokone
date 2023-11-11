INSERT INTO events (title, event_description, event_date, registration_starts, event_location) VALUES ('TechXperience Summit 2023', 'Join us for an exciting day of innovation and collaboration at the TechXperience Summit 2023. This event brings together thought leaders, industry experts, and enthusiasts to explore the latest trends in technology and discuss the future of innovation.', '2023-11-23 09:00:00', '2023-11-15 09:00:00', 'Maarintie 8');

INSERT INTO events (title, event_description, event_date, registration_starts, event_location) VALUES ('TWO_Event_TM', 'Second event!', '2023-11-15 09:00:00', '2023-11-13 14:00:00', 'JMT 5');

INSERT INTO event_registrations (events_id, participant_name, email) VALUES (2, 'John Doe', 'john.doe@email.com');

INSERT INTO admins (email, password) VALUES ('admin@admin.com', '$2a$10$k5.EIqPBAZqdp4tP48mw0eZDcrkEJnK.Maoa2Ow8hmzCtW6YmTGuG');