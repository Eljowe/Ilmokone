import { Router } from '../deps.js';

const router = new Router();

import {
  handleGet,
  handleGetEvent,
  handleGetRegistered,
  handleGetRegisteredForEventId,
  handleCreateEvent,
  handleGetEventImage,
} from '../controllers/registrationController.js';
import { processLogin } from '../controllers/loginController.js';
import { checkAuth, logout } from '../controllers/authController.js';

router
  .get('/events', ctx => {
    return handleGet({
      response: ctx.response,
    });
  })
  .get('/event/:id', ctx => {
    const { id } = ctx.params;
    return handleGetEvent({
      id: id,
      response: ctx.response,
    });
  })
  .post('/register', ctx => {
    return handleGet({
      response: ctx.response,
    });
  })
  .get('/registered', ctx => {
    return handleGetRegistered({
      response: ctx.response,
    });
  })
  .get('/registered/:id', ctx => {
    const { id } = ctx.params;
    return handleGetRegisteredForEventId({
      id: id,
      response: ctx.response,
    });
  })
  .post('/login', ctx => {
    return processLogin({
      response: ctx.response,
      request: ctx.request,
      state: ctx.state,
    });
  })
  .get('/auth', ctx => {
    return checkAuth({
      response: ctx.response,
      request: ctx.request,
      state: ctx.state,
    });
  })
  .get('/logout', ctx => {
    return logout({
      response: ctx.response,
      request: ctx.request,
      state: ctx.state,
    });
  })
  .post('/addEvent', ctx => {
    return handleCreateEvent({
      response: ctx.response,
      request: ctx.request,
      state: ctx.state,
    });
  })
  .get('/eventImage/:id', ctx => {
    const { id } = ctx.params;
    return handleGetEventImage({
      id: id,
      response: ctx.response,
    });
  });

export default router;
