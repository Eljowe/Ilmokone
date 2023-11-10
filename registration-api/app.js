import { serve } from './deps.js';
import * as registrationService from './services/registrationService.js';
import { Application, Session } from './deps.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { userMiddleware } from './middlewares/userMiddleware.js';
import { adminMiddleware } from './middlewares/adminMiddleware.js';

const handleGet = async request => {
  return Response.json(await registrationService.findAll());
};

const handleGetEvent = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  try {
    return Response.json(await registrationService.findEvent(id));
  } catch (e) {
    return Response.json({ error: 'no events by that id' });
  }
};

const handleGetRegistered = async request => {
  return Response.json(await registrationService.findRegistered());
};

const handleGetRegisteredForEventId = async (request, urlPatternResult) => {
  const id = urlPatternResult.pathname.groups.id;
  try {
    return Response.json(await registrationService.findRegisteredForEvent(id));
  } catch (e) {
    return Response.json({ error: 'no participants' });
  }
};

const handleRegister = async request => {
  const requestData = await request.json();
};

const urlMapping = [
  {
    method: 'GET',
    pattern: new URLPattern({ pathname: '/' }),
    fn: handleGet,
  },
  {
    method: 'GET',
    pattern: new URLPattern({ pathname: '/event/:id' }),
    fn: handleGetEvent,
  },
  {
    method: 'POST',
    pattern: new URLPattern({ pathname: '/register' }),
    fn: handleRegister,
  },
  {
    method: 'GET',
    pattern: new URLPattern({ pathname: '/registered' }),
    fn: handleGetRegistered,
  },
  {
    method: 'GET',
    pattern: new URLPattern({ pathname: '/registered/:id' }),
    fn: handleGetRegisteredForEventId,
  },
];

const handleRequest = async request => {
  const mapping = urlMapping.find(um => um.method === request.method && um.pattern.test(request.url));

  if (!mapping) {
    return new Response('Not found', { status: 404 });
  }

  const mappingResult = mapping.pattern.exec(request.url);
  try {
    return await mapping.fn(request, mappingResult);
  } catch (e) {
    console.log(e);
    return new Response(e.stack, { status: 500 });
  }
};

const portConfig = { port: 7777, hostname: '0.0.0.0' };
serve(handleRequest, portConfig);
