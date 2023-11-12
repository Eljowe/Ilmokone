CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  event_description TEXT NOT NULL,
  alcohol_options BOOLEAN DEFAULT TRUE,
  event_date TEXT NOT NULL,
  registration_starts TEXT NOT NULL,
  event_location TEXT,
  maximum_participants INTEGER
);

CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  events_id INTEGER REFERENCES events(id),
  options TEXT,
  participant_name TEXT NOT NULL,
  display_name TEXT DEFAULT '***',
  has_paid BOOLEAN DEFAULT FALSE,
  time_registered TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email VARCHAR(255) UNIQUE,
  alcohol BOOLEAN DEFAULT FALSE
);

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60),
  admin BOOLEAN DEFAULT TRUE
);

CREATE UNIQUE INDEX ON event_registrations((lower(email)));

CREATE UNIQUE INDEX ON admins((lower(email)));