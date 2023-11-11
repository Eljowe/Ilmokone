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

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: 'form' });
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

export { registerUser, handleGet, handleGetEvent, handleGetRegistered, handleGetRegisteredForEventId };
