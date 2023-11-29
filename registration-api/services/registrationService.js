import { sql } from '../database/database.js';

const findAll = async () => {
  return await sql`SELECT * FROM events;`;
};

const findEvent = async event_id => {
  return await sql`SELECT * FROM events WHERE id=${event_id};`;
};

const register = async content => {
  try {
    if (!content) {
      return null;
    }
    await sql`INSERT INTO event_registrations (events_id, options, participant_name, email) VALUES (${content.id}, ${content.options}, ${content.participant_name}, ${content.email})`;
    console.log('Added to database');
    return true;
  } catch (exception) {
    console.log('Error adding registration to database');
    console.log(exception);
    return null;
  }
};

const findRegistered = async () => {
  return await sql`SELECT * FROM event_registrations;`;
};

const findRegisteredForEvent = async event_id => {
  return await sql`SELECT * FROM event_registrations WHERE events_id = ${event_id};`;
};

const addEvent = async content => {
  try {
    if (!content) {
      return null;
    }
    await sql`INSERT INTO events 
    (title, 
      event_description, 
      alcohol_options, 
      event_date, 
      registration_starts, 
      event_location, 
      maximum_participants,
      image_path) 
    VALUES 
    (${content.title}, 
      ${content.event_description}, 
      ${content.alcohol_options}, 
      ${content.event_date}, 
      ${content.registration_starts}, 
      ${content.event_location}, 
      ${content.maximum_participants != 'undefined' ? content.maximum_participants : null},
      ${content.image_path != 'undefined' ? content.image_path : null})`;
    console.log('Added to database');
    return true;
  } catch (exception) {
    console.log('Error adding registration to database');
    console.log(exception);
    return null;
  }
};

const deleteEvent = async event_id => {
  try {
    await sql`DELETE FROM events WHERE id = ${event_id};`;
  } catch (exception) {
    console.log('Error deleting event');
    console.log(exception);
    return null;
  }
};

const editEvent = async content => {
  try {
    if (!content) {
      return null;
    }
    await sql`UPDATE events SET 
    title = ${content.title}, 
    event_description = ${content.event_description}, 
    alcohol_options = ${content.alcohol_options}, 
    event_date = ${content.event_date}, 
    registration_starts = ${content.registration_starts}, 
    event_location = ${content.event_location}, 
    maximum_participants = ${content.maximum_participants}
    WHERE id = ${content.id};`;
    console.log('Added to database');
    return true;
  } catch (exception) {
    console.log('Error adding registration to database');
    console.log(exception);
    return null;
  }
};

export { findAll, register, findRegistered, findRegisteredForEvent, findEvent, deleteEvent, addEvent, editEvent };
