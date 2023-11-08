CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  event_description TEXT NOT NULL,
  options TEXT,
  event_date TEXT NOT NULL,
  registration_starts TEXT NOT NULL
);


CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  events_id INTEGER REFERENCES events(id),
  options TEXT,
  participant_name TEXT NOT NULL,
  has_paid BOOLEAN DEFAULT FALSE,
  time_registered TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL
);