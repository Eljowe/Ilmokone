import { bcrypt } from '../deps.js';
import * as userService from '../services/userService.js';
import { validasaur } from '../deps.js';
import * as registrationService from '../services/registrationService.js';
import { multiParser } from 'https://deno.land/x/multiparser/mod.ts';

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

const SAVE_PATH = '../images';

const handleCreateEvent = async ({ request, response, state }) => {
  if (!state.session.get('user')) {
    response.status = 401;
    response.body = 'unauthorized';
    return;
  }
  try {
    await Deno.mkdir(SAVE_PATH, { recursive: true });
    console.log(`Directory exists or was created successfully: ${Deno.realPathSync(SAVE_PATH)}`);
  } catch (e) {
    console.error('Error creating directory:', e);
  }
  const form = await multiParser(request.originalRequest.request);
  if (form) {
    try {
      var uniqueFilename = null;
      if (form.files['files']) {
        const originalFilename = form.files['files'].filename;
        const fileExt = originalFilename.substring(originalFilename.lastIndexOf('.'));
        uniqueFilename = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;
      }
      const data = {
        title: form.fields['title'],
        event_description: form.fields['description'],
        event_location: form.fields['event_location'],
        event_date: form.fields['event_date'],
        registration_starts: form.fields['registration_starts'],
        maximum_participants: form.fields['maximum_participants'],
        alcohol_options: form.fields['alcohol_options'],
        image_path: uniqueFilename,
      };
      console.log(data);

      try {
        await registrationService.addEvent(data);
        if (uniqueFilename) {
          await Deno.writeFile(`${SAVE_PATH}/${uniqueFilename}`, form.files['files'].content);
          console.log('File saved to server with unique filename:', uniqueFilename);
        }
        response.status = 200;
      } catch (e) {
        console.error(e);
        response.status = 500;
      }
    } catch (e) {
      console.error(e);
      response.status = 500;
    }
  }
};

const handleGetEventImage = async ({ response, id }) => {
  console.log('id', id);
  try {
    const data = await registrationService.findEvent(id);
    console.log(data[0].image_path);
    const filePath = `${SAVE_PATH}/${data[0].image_path}`;
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${data[0].image_path}"`);
    const body = await Deno.readFile(filePath);
    response.status = 200;
    response.body = body;
    response.headers = headers;
  } catch (e) {
    response.status = 500;
    response.body = 'error: no event by id';
  }
};

export {
  registerUser,
  handleGet,
  handleGetEvent,
  handleGetRegistered,
  handleGetRegisteredForEventId,
  handleCreateEvent,
  handleGetEventImage,
};
