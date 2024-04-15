The application can be executed by entering the command `docker compose -f docker-compose.yml up -d` within the main directory of the application.

For deploying the app use command `docker compose -f docker-compose.prod.yml up -d` in the corresponding provider configuration file.

## Ilmokone (an event creation and registration platform)

Creating registrations for events and signing up for them being quite a common task, I decided to try and create a fullstack application for those purposes. I wanted to sharpen my docker and nginx skills at the same time.

The stack is the following:

- Docker, dockerizing database, API, and frontend
- Nginx, reverse proxy
- Next.js, frontend with Tailwind
- Deno, backend

While this project remains unfinished (because there is no actual scope to asserting the final features), it is something I come back to whenever reminding myself of nginx and docker mechanics.

What is currently implemented:

- Postgres database and initial schematics for events and users
- Auth, creating users, logging in, logging out, roles (session auth)
- API layer
- Frontend separated for admins and regular users
- Admins can create events with unique properties
- Users can sign up for event

What is not implemented but I planned to implement:

- TESTS
- Languages, i18n
- Editing and deleting events (in the works)
- Deploying config
- Overall user guidelines
- More flexible event options (would require reshaping database and schemas)
- Performance
- UI layout
- Everything else
