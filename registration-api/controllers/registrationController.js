import { bcrypt } from '../deps.js';
import * as userService from '../services/userService.js';
import { validasaur } from '../deps.js';
import * as registrationService from '../services/registrationService.js';

const registrationValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.minLength(4)],
};

const handleGet = async ({ response }) => {
  try {
    const data = await registrationService.findAll();
    response.status = 200;
    response.body = data;
  } catch (e) {
    response.status = 500;
    response.body = 'error';
  }
};

const handleGetEvent = async ({ response, id }) => {
  try {
    const data = await registrationService.findEvent(id);
    response.status = 200;
    response.body = data;
  } catch (e) {
    response.status = 500;
    response.body = 'error: no event by id';
  }
};

const handleGetRegistered = async ({ response }) => {
  try {
    const data = await registrationService.findRegistered();
    response.status = 200;
    response.body = data;
  } catch (e) {
    response.status = 500;
    response.body = 'error: no registered';
  }
};

const handleGetRegisteredForEventId = async ({ response, id }) => {
  try {
    const data = await registrationService.findRegisteredForEvent(id);
    response.status = 200;
    response.body = data;
  } catch (e) {
    response.status = 500;
    response.body = 'error: no registered';
  }
};

const registerUser = async ({ request, response, state }) => {
  const body = request.body({ type: 'json' });
  const params = await body.value;
  const data = {
    email: params.get('email'),
    password: params.get('password'),
  };
  const [passes, errors] = await validasaur.validate(data, registrationValidationRules);
  if (passes) {
    await userService.addUser(params.get('email'), await bcrypt.hash(params.get('password')));
    response.status = 200;
    response.body = 'success';
  } else {
    response.status = 401;
    response.body = 'error';
  }
};

const handleCreateEvent = async ({ request, response, state }) => {
  if (!state.session.get('user')) {
    response.status = 401;
    response.body = 'unauthorized';
    return;
  } else {
    response.status = 200;
    response.body = 'authorized';
  }
  const body = request.body({ type: 'json' });
  const params = await body.value;
  const data = {
    title: params.get('title'),
    event_description: params.get('event_description'),
    alcohol_options: params.get('alcohol_options'),
    event_date: params.get('event_date'),
    registration_starts: params.get('registration_starts'),
    event_location: params.get('event_location'),
    maximum_participants: params.get('maximum_participants'),
  };
  try {
    await userService.addEvent(data);
    response.status = 200;
    response.body = 'success';
  } catch (e) {
    response.status = 401;
    response.body = 'error';
  }
};

export {
  registerUser,
  handleGet,
  handleGetEvent,
  handleGetRegistered,
  handleGetRegisteredForEventId,
  handleCreateEvent,
};
