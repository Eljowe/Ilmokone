import { Router } from '../deps.js';

const router = new Router();

import {
  handleGet,
  handleGetEvent,
  handleGetRegistered,
  handleGetRegisteredForEventId,
} from '../controllers/registrationController.js';

router
  .get('/', ctx => {
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
  });

export default router;
