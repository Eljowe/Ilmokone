import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM events;`;
};

const register = async (content) => {
  try {
    if (!content) {
      return null;
    }
    await sql`INSERT INTO event_registrations (events_id, options, participant_name, email) VALUES (${content.id}, ${content.options}, ${content.participant_name}, ${content.email})`;
    console.log("Added to database");
    return true;
  } catch (exception) {
    console.log("Error adding registration to database");
    console.log(exception);
    return null;
  }
};

const findRegistered = async () => {
  return await sql`SELECT * FROM event_registrations;`;
};

const findRegisteredForEvent = async (event_id) => {
  return await sql`SELECT * FROM event_registrations WHERE events_id = ${event_id};`;
};

export { findAll, register, findRegistered, findRegisteredForEvent };
